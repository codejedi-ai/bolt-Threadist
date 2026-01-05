import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RedditPost {
  data: {
    id: string;
    title: string;
    selftext: string;
    author: string;
    subreddit: string;
    ups: number;
    num_comments: number;
    created_utc: number;
    permalink: string;
    url: string;
  };
}

interface RedditListing {
  data: {
    children: RedditPost[];
    after: string | null;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const subreddit = url.searchParams.get("subreddit") || "nosleep";
    const sort = url.searchParams.get("sort") || "hot";
    const limit = url.searchParams.get("limit") || "25";
    const postId = url.searchParams.get("id");

    let redditUrl: string;
    
    if (postId) {
      redditUrl = `https://www.reddit.com/comments/${postId}.json?raw_json=1`;
    } else {
      redditUrl = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&raw_json=1`;
    }

    const response = await fetch(redditUrl, {
      headers: {
        "User-Agent": "Threadist/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();

    if (postId) {
      const postData = data[0]?.data?.children?.[0]?.data;
      if (!postData) {
        return new Response(
          JSON.stringify({ error: "Post not found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const story = {
        id: postData.id,
        title: postData.title,
        content: postData.selftext,
        author: postData.author,
        subreddit: postData.subreddit,
        upvotes: postData.ups,
        comments: postData.num_comments,
        created_at: new Date(postData.created_utc * 1000).toISOString(),
        is_narrated: false,
        reddit_id: postData.id,
        reddit_url: `https://reddit.com${postData.permalink}`,
      };

      return new Response(
        JSON.stringify({ story }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const listing = data as RedditListing;
    const stories = listing.data.children
      .filter((post) => post.data.selftext && post.data.selftext.length > 100)
      .map((post) => ({
        id: post.data.id,
        title: post.data.title,
        content: post.data.selftext,
        author: post.data.author,
        subreddit: post.data.subreddit,
        upvotes: post.data.ups,
        comments: post.data.num_comments,
        created_at: new Date(post.data.created_utc * 1000).toISOString(),
        is_narrated: false,
        reddit_id: post.data.id,
        reddit_url: `https://reddit.com${post.data.permalink}`,
      }));

    return new Response(
      JSON.stringify({ stories }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
