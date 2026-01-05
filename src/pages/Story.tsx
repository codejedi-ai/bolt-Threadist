import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Divider,
  IconButton,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useStory } from '../hooks/useStory';
import { FaShare, FaBookmark, FaExternalLinkAlt } from 'react-icons/fa';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { formatDistanceToNow } from 'date-fns';

export default function Story() {
  const { postId } = useParams();
  const { story, loading, error } = useStory(postId);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const bg = useColorModeValue('#dae0e6', '#0b1426');
  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const handleVote = (voteType: 'up' | 'down') => {
    setUserVote(userVote === voteType ? null : voteType);
  };

  if (loading) {
    return (
      <Box bg={bg} minH="100vh" pt="60px">
        <Container maxW="800px" py={6}>
          <VStack spacing={6} align="center">
            <Spinner size="lg" color="orange.500" />
            <Text color="gray.500">Loading story...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (error || !story) {
    return (
      <Box bg={bg} minH="100vh" pt="60px">
        <Container maxW="800px" py={6}>
          <VStack spacing={6} align="center">
            <Text fontSize="xl" color="red.500">
              {error || 'Story not found'}
            </Text>
            <Button colorScheme="orange" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bg} minH="100vh" pt="60px">
      <Container maxW="800px" py={6}>
        <VStack spacing={6} align="stretch">
          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            overflow="hidden"
          >
            <HStack spacing={0} align="stretch">
              <VStack
                spacing={1}
                p={4}
                bg={useColorModeValue('gray.50', '#161617')}
                minW="60px"
              >
                <IconButton
                  aria-label="Upvote"
                  icon={<ChevronUpIcon />}
                  size="md"
                  variant="ghost"
                  color={userVote === 'up' ? 'orange.500' : 'gray.400'}
                  onClick={() => handleVote('up')}
                />
                <Text fontSize="lg" fontWeight="bold">
                  {story.upvotes + (userVote === 'up' ? 1 : userVote === 'down' ? -1 : 0)}
                </Text>
                <IconButton
                  aria-label="Downvote"
                  icon={<ChevronDownIcon />}
                  size="md"
                  variant="ghost"
                  color={userVote === 'down' ? 'blue.500' : 'gray.400'}
                  onClick={() => handleVote('down')}
                />
              </VStack>

              <VStack flex={1} align="stretch" spacing={4} p={6}>
                <VStack align="flex-start" spacing={2}>
                  <HStack spacing={2} fontSize="sm" color={textColor}>
                    <Text fontWeight="bold">r/{story.subreddit}</Text>
                    <Text>-</Text>
                    <Text>Posted by u/{story.author}</Text>
                    <Text>-</Text>
                    <Text>{formatDistanceToNow(new Date(story.created_at))} ago</Text>
                  </HStack>
                  <Text fontSize="xl" fontWeight="bold" lineHeight="1.3">
                    {story.title}
                  </Text>
                </VStack>

                <Box>
                  <Text lineHeight="1.8" whiteSpace="pre-wrap" fontSize="md">
                    {story.content}
                  </Text>
                </Box>

                <Divider />

                <HStack spacing={4}>
                  {story.reddit_url && (
                    <Button
                      as={Link}
                      href={story.reddit_url}
                      isExternal
                      leftIcon={<FaExternalLinkAlt />}
                      variant="ghost"
                      size="sm"
                      color={textColor}
                    >
                      View on Reddit
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
                  <Button
                    leftIcon={<FaBookmark />}
                    variant="ghost"
                    size="sm"
                    color={textColor}
                  >
                    Save
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>

          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            p={6}
          >
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="bold">
                {story.comments} Comments
              </Text>
              <Text color={textColor} fontSize="sm">
                Comments are loaded from Reddit. Click "View on Reddit" to see the full discussion.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
