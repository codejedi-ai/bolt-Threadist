import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import StoryCard from '../components/StoryCard';
import Sidebar from '../components/Sidebar';
import { FaFire, FaRocket, FaClock, FaVolumeUp } from 'react-icons/fa';
import { useStories } from '../hooks/useStories';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const sortOptions = ['hot', 'rising', 'new'] as const;
  const currentSort = sortOptions[selectedTab];
  
  const { stories, loading, error, refetch } = useStories({
    sort: currentSort,
    limit: 20,
  });
  
  const bg = useColorModeValue('#dae0e6', '#0b1426');

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Box bg={bg} minH="100vh" pt="60px">
      <Container maxW="1200px" py={6}>
        <Flex gap={6}>
          {/* Main Content */}
          <Box flex={1}>
            <VStack spacing={4} align="stretch">
              {/* Header */}
              <HStack justify="space-between" align="center">
                <HStack spacing={4}>
                  <Text fontSize="2xl" fontWeight="bold">
                    Popular Stories
                  </Text>
                  <Badge colorScheme="orange" variant="subtle">
                    <HStack spacing={1}>
                      <FaVolumeUp size={10} />
                      <Text fontSize="xs">AI Narrated Available</Text>
                    </HStack>
                  </Badge>
                </HStack>
              </HStack>

              {/* Sorting Tabs */}
              <Tabs
                index={selectedTab}
                onChange={handleTabChange}
                variant="soft-rounded"
                colorScheme="orange"
              >
                <TabList>
                  <Tab>
                    <HStack spacing={2}>
                      <FaFire />
                      <Text>Hot</Text>
                    </HStack>
                  </Tab>
                  <Tab>
                    <HStack spacing={2}>
                      <FaRocket />
                      <Text>Rising</Text>
                    </HStack>
                  </Tab>
                  <Tab>
                    <HStack spacing={2}>
                      <FaClock />
                      <Text>New</Text>
                    </HStack>
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    {loading ? (
                      <VStack spacing={4} py={8}>
                        <Spinner size="lg" color="orange.500" />
                        <Text color="gray.500">Loading stories...</Text>
                      </VStack>
                    ) : error ? (
                      <Alert status="error">
                        <AlertIcon />
                        <VStack align="flex-start" spacing={2}>
                          <Text>{error}</Text>
                          <Button size="sm" onClick={refetch}>
                            Try Again
                          </Button>
                        </VStack>
                      </Alert>
                    ) : stories.length === 0 ? (
                      <VStack spacing={4} py={8}>
                        <Text color="gray.500">No stories found</Text>
                        <Button onClick={refetch}>Refresh</Button>
                      </VStack>
                    ) : (
                      <VStack spacing={4} align="stretch">
                        {stories.map((story) => (
                          <StoryCard
                            key={story.id}
                            story={{
                              ...story,
                              createdAt: new Date(story.created_at),
                              isNarrated: story.is_narrated,
                              audioUrl: story.audio_url,
                              reddit_url: story.reddit_url,
                            }}
                          />
                        ))}
                      </VStack>
                    )}
                  </TabPanel>
                  <TabPanel px={0}>
                    {loading ? (
                      <VStack spacing={4} py={8}>
                        <Spinner size="lg" color="orange.500" />
                        <Text color="gray.500">Loading stories...</Text>
                      </VStack>
                    ) : error ? (
                      <Alert status="error">
                        <AlertIcon />
                        <VStack align="flex-start" spacing={2}>
                          <Text>{error}</Text>
                          <Button size="sm" onClick={refetch}>
                            Try Again
                          </Button>
                        </VStack>
                      </Alert>
                    ) : stories.length === 0 ? (
                      <VStack spacing={4} py={8}>
                        <Text color="gray.500">No stories found</Text>
                        <Button onClick={refetch}>Refresh</Button>
                      </VStack>
                    ) : (
                      <VStack spacing={4} align="stretch">
                        {stories.map((story) => (
                          <StoryCard
                            key={story.id}
                            story={{
                              ...story,
                              createdAt: new Date(story.created_at),
                              isNarrated: story.is_narrated,
                              audioUrl: story.audio_url,
                              reddit_url: story.reddit_url,
                            }}
                          />
                        ))}
                      </VStack>
                    )}
                  </TabPanel>
                  <TabPanel px={0}>
                    {loading ? (
                      <VStack spacing={4} py={8}>
                        <Spinner size="lg" color="orange.500" />
                        <Text color="gray.500">Loading stories...</Text>
                      </VStack>
                    ) : error ? (
                      <Alert status="error">
                        <AlertIcon />
                        <VStack align="flex-start" spacing={2}>
                          <Text>{error}</Text>
                          <Button size="sm" onClick={refetch}>
                            Try Again
                          </Button>
                        </VStack>
                      </Alert>
                    ) : stories.length === 0 ? (
                      <VStack spacing={4} py={8}>
                        <Text color="gray.500">No stories found</Text>
                        <Button onClick={refetch}>Refresh</Button>
                      </VStack>
                    ) : (
                      <VStack spacing={4} align="stretch">
                        {stories.map((story) => (
                          <StoryCard
                            key={story.id}
                            story={{
                              ...story,
                              createdAt: new Date(story.created_at),
                              isNarrated: story.is_narrated,
                              audioUrl: story.audio_url,
                              reddit_url: story.reddit_url,
                            }}
                          />
                        ))}
                      </VStack>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </Box>

          {/* Sidebar */}
          <Box w="300px" display={{ base: 'none', lg: 'block' }}>
            <Sidebar />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}