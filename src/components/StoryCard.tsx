import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Badge,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaPlay, FaPause, FaVolumeUp, FaComments, FaShare, FaExternalLinkAlt } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    content: string;
    author: string;
    subreddit: string;
    upvotes: number;
    comments: number;
    createdAt: Date;
    audioUrl?: string;
    isNarrated?: boolean;
    reddit_url?: string;
  };
}

export default function StoryCard({ story }: StoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const handleVote = (voteType: 'up' | 'down') => {
    setUserVote(userVote === voteType ? null : voteType);
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio playback logic would go here
  };

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      overflow="hidden"
      _hover={{ borderColor: 'orange.500' }}
      transition="border-color 0.2s"
    >
      <HStack spacing={0} align="stretch">
        {/* Vote Section */}
        <VStack
          spacing={1}
          p={2}
          bg={useColorModeValue('gray.50', '#161617')}
          minW="50px"
        >
          <IconButton
            aria-label="Upvote"
            icon={<ChevronUpIcon />}
            size="sm"
            variant="ghost"
            color={userVote === 'up' ? 'orange.500' : 'gray.400'}
            onClick={() => handleVote('up')}
          />
          <Text fontSize="sm" fontWeight="bold">
            {story.upvotes + (userVote === 'up' ? 1 : userVote === 'down' ? -1 : 0)}
          </Text>
          <IconButton
            aria-label="Downvote"
            icon={<ChevronDownIcon />}
            size="sm"
            variant="ghost"
            color={userVote === 'down' ? 'blue.500' : 'gray.400'}
            onClick={() => handleVote('down')}
          />
        </VStack>

        {/* Content Section */}
        <VStack flex={1} align="stretch" spacing={3} p={4}>
          {/* Header */}
          <HStack justify="space-between" align="flex-start">
            <VStack align="flex-start" spacing={1} flex={1}>
              <HStack spacing={2} fontSize="sm" color={textColor}>
                <Text fontWeight="bold">r/{story.subreddit}</Text>
                <Text>•</Text>
                <Text>Posted by u/{story.author}</Text>
                <Text>•</Text>
                <Text>{formatDistanceToNow(story.createdAt)} ago</Text>
              </HStack>
              <Text
                as={RouterLink}
                to={`/r/${story.subreddit}/comments/${story.id}`}
                fontSize="lg"
                fontWeight="bold"
                lineHeight="1.2"
                _hover={{ color: 'orange.500' }}
                cursor="pointer"
              >
                {story.title}
              </Text>
            </VStack>
            {story.isNarrated && (
              <Badge colorScheme="green" variant="subtle">
                <HStack spacing={1}>
                  <FaVolumeUp size={10} />
                  <Text fontSize="xs">AI Narrated</Text>
                </HStack>
              </Badge>
            )}
          </HStack>

          {/* Content Preview */}
          <Box>
            <Text color={textColor} noOfLines={isExpanded ? undefined : 3}>
              {story.content}
            </Text>
            {story.content.length > 200 && (
              <Button
                variant="link"
                size="sm"
                color="orange.500"
                onClick={() => setIsExpanded(!isExpanded)}
                rightIcon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </Button>
            )}
          </Box>

          <Divider />

          {/* Actions */}
          <HStack spacing={4}>
            <Button
              leftIcon={<FaComments />}
              variant="ghost"
              size="sm"
              color={textColor}
            >
              {story.comments} Comments
            </Button>
            {story.reddit_url && (
              <Button
                as="a"
                href={story.reddit_url}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaExternalLinkAlt />}
                variant="ghost"
                size="sm"
                color={textColor}
              >
                Reddit
              </Button>
            )}
            <Button
              leftIcon={<FaShare />}
              variant="ghost"
              size="sm"
              color={textColor}
            >
              Share
            </Button>
            {story.isNarrated && (
              <Button
                leftIcon={isPlaying ? <FaPause /> : <FaPlay />}
                colorScheme="orange"
                size="sm"
                onClick={handlePlayAudio}
              >
                {isPlaying ? 'Pause' : 'Listen'}
              </Button>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}