const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  created_at: string;
  is_narrated: boolean;
  audio_url?: string;
  reddit_id?: string;
  reddit_url?: string;
}

export interface Subreddit {
  id: string;
  name: string;
  description: string;
  members: number;
  online: number;
  created_at: string;
  icon?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private async request<T>(endpoint: string, params: Record<string, string> = {}): Promise<ApiResponse<T>> {
    try {
      const url = new URL(`${SUPABASE_URL}/functions/v1/${endpoint}`);
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
      });

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: 'Network error' };
    }
  }

  async getStories(params?: {
    subreddit?: string;
    sort?: 'hot' | 'new' | 'rising';
    limit?: number;
  }): Promise<ApiResponse<{ stories: Story[] }>> {
    return this.request<{ stories: Story[] }>('reddit-stories', {
      subreddit: params?.subreddit || '',
      sort: params?.sort || 'hot',
      limit: params?.limit?.toString() || '25',
    });
  }

  async getStory(id: string): Promise<ApiResponse<{ story: Story }>> {
    return this.request<{ story: Story }>('reddit-stories', { id });
  }

  async getSubreddits(_params?: {
    limit?: number;
  }): Promise<ApiResponse<{ subreddits: Subreddit[] }>> {
    const defaultSubreddits: Subreddit[] = [
      { id: '1', name: 'nosleep', description: 'A place for authors to share original horror stories', members: 17400000, online: 5200, created_at: new Date().toISOString() },
      { id: '2', name: 'LetsNotMeet', description: 'True scary stories about real people', members: 1800000, online: 1200, created_at: new Date().toISOString() },
      { id: '3', name: 'creepyencounters', description: 'Unsettling encounters that left you feeling uneasy', members: 450000, online: 800, created_at: new Date().toISOString() },
      { id: '4', name: 'Glitch_in_the_Matrix', description: 'Eye-witness accounts of inexplicable events', members: 680000, online: 950, created_at: new Date().toISOString() },
      { id: '5', name: 'TrueScaryStories', description: 'True accounts of frightening experiences', members: 320000, online: 600, created_at: new Date().toISOString() },
      { id: '6', name: 'shortscarystories', description: 'Short scary stories under 500 words', members: 1100000, online: 2100, created_at: new Date().toISOString() },
    ];
    return { data: { subreddits: defaultSubreddits } };
  }

  async getSubreddit(name: string): Promise<ApiResponse<{ subreddit: Subreddit }>> {
    const result = await this.getSubreddits();
    const subreddit = result.data?.subreddits.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (subreddit) {
      return { data: { subreddit } };
    }
    return { data: { subreddit: { id: name, name, description: `Stories from r/${name}`, members: 0, online: 0, created_at: new Date().toISOString() } } };
  }

  async getSubredditStories(name: string, params?: {
    sort?: 'hot' | 'new' | 'rising';
    limit?: number;
  }): Promise<ApiResponse<{ stories: Story[] }>> {
    return this.getStories({ ...params, subreddit: name });
  }
}

export const apiClient = new ApiClient();
