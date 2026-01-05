import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Heading,
  SimpleGrid,
  Icon,
  Flex,
  Badge,
  Avatar,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPlay, FaVolumeUp, FaReddit, FaRocket, FaUsers, FaClock } from 'react-icons/fa';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WaitlistModal from '../components/waitlist/WaitlistModal';

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => {
  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  return (
    <Box
      bg={cardBg}
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      textAlign="center"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      transition="all 0.3s ease"
    >
      <Icon as={icon} w={12} h={12} color="orange.500" mb={4} />
      <Heading size="md" mb={3}>{title}</Heading>
      <Text color="gray.500">{description}</Text>
    </Box>
  );
};

const StoryPreview = () => {
  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      overflow="hidden"
      maxW="600px"
      mx="auto"
    >
      <HStack spacing={0} align="stretch">
        <VStack
          spacing={1}
          p={3}
          bg={useColorModeValue('gray.50', '#161617')}
          minW="50px"
        >
          <ChevronUpIcon color="gray.400" />
          <Text fontSize="sm" fontWeight="bold">2.8k</Text>
          <ChevronDownIcon color="gray.400" />
        </VStack>
        <VStack flex={1} align="stretch" spacing={3} p={4}>
          <HStack spacing={2} fontSize="sm" color="gray.500">
            <Text fontWeight="bold">r/nosleep</Text>
            <Text>•</Text>
            <Text>Posted by u/storyteller</Text>
            <Text>•</Text>
            <Text>2 hours ago</Text>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" lineHeight="1.2">
            I found a door in my basement that wasn't there yesterday
          </Text>
          <Box
            bg={useColorModeValue('orange.50', 'orange.900')}
            p={3}
            borderRadius="md"
            border="1px solid"
            borderColor="orange.200"
          >
            <HStack spacing={3}>
              <Button
                leftIcon={<FaPlay />}
                colorScheme="orange"
                size="sm"
              >
                Listen to Story
              </Button>
              <Badge colorScheme="green" variant="subtle">
                <HStack spacing={1}>
                  <FaVolumeUp size={10} />
                  <Text fontSize="xs">AI Narrated</Text>
                </HStack>
              </Badge>
            </HStack>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default function Landing() {
  const bg = useColorModeValue('#dae0e6', '#0b1426');
  const heroGradient = useColorModeValue(
    'linear(to-br, orange.400, red.500)',
    'linear(to-br, orange.600, red.700)'
  );
  
  const { isAuthenticated } = useAuth();
  const { isOpen: isWaitlistOpen, onOpen: onWaitlistOpen, onClose: onWaitlistClose } = useDisclosure();

  return (
    <>
      <Box bg={bg} minH="100vh" pt="60px">
        {/* Hero Section */}
        <Box
          bgGradient={heroGradient}
          color="white"
          py={20}
          position="relative"
          overflow="hidden"
        >
          <Container maxW="1200px">
            <VStack spacing={8} textAlign="center">
              <VStack spacing={4}>
                <Heading size="3xl" fontWeight="bold">
                  Reddit Stories,{' '}
                  <Text as="span" color="yellow.300">
                    Narrated by AI
                  </Text>
                </Heading>
                <Text fontSize="xl" maxW="600px" opacity={0.9}>
                  Discover captivating Reddit stories and listen to them with amazing AI-powered voices. 
                  Turn your commute into an adventure with Threadist.
                </Text>
              </VStack>
              
              <HStack spacing={4}>
                {isAuthenticated ? (
                  <Button
                    as={RouterLink}
                    to="/home"
                    size="lg"
                    colorScheme="yellow"
                    color="black"
                    leftIcon={<FaPlay />}
                    _hover={{ transform: 'translateY(-2px)' }}
                  >
                    Start Listening
                  </Button>
                ) : (
                  <Button
                    as={RouterLink}
                    to="/signin"
                    size="lg"
                    colorScheme="yellow"
                    color="black"
                    leftIcon={<FaUsers />}
                  >
                    Get Started
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  color="white"
                  borderColor="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  Learn More
                </Button>
              </HStack>

              <HStack spacing={8} fontSize="sm" opacity={0.8}>
                <HStack spacing={2}>
                  <FaUsers />
                  <Text>15M+ Stories</Text>
                </HStack>
                <HStack spacing={2}>
                  <FaVolumeUp />
                  <Text>AI Narration</Text>
                </HStack>
                <HStack spacing={2}>
                  <FaReddit />
                  <Text>Reddit Powered</Text>
                </HStack>
              </HStack>
            </VStack>
          </Container>
        </Box>

        {/* Story Preview Section */}
        <Container maxW="1200px" py={16}>
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Experience Stories Like Never Before</Heading>
              <Text fontSize="lg" color="gray.500" maxW="600px">
                See how Threadist transforms Reddit stories into immersive audio experiences
              </Text>
            </VStack>
            <StoryPreview />
          </VStack>
        </Container>

        {/* Features Section */}
        <Box py={16} bg={useColorModeValue('gray.50', '#161617')}>
          <Container maxW="1200px">
            <VStack spacing={12}>
              <VStack spacing={4} textAlign="center">
                <Heading size="xl">Why Choose Threadist?</Heading>
                <Text fontSize="lg" color="gray.500" maxW="600px">
                  The perfect blend of Reddit's best stories and cutting-edge AI narration technology
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                <FeatureCard
                  icon={FaVolumeUp}
                  title="AI Narration"
                  description="High-quality AI voices bring stories to life with natural, engaging narration"
                />
                <FeatureCard
                  icon={FaReddit}
                  title="Reddit Stories"
                  description="Access the best stories from popular subreddits like r/nosleep, r/tifu, and more"
                />
                <FeatureCard
                  icon={FaRocket}
                  title="Smart Discovery"
                  description="Personalized recommendations based on your interests and listening history"
                />
                <FeatureCard
                  icon={FaClock}
                  title="On-Demand Audio"
                  description="Generate audio for any story instantly or listen to pre-narrated content"
                />
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* Popular Communities Section */}
        <Container maxW="1200px" py={16}>
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Popular Story Communities</Heading>
              <Text fontSize="lg" color="gray.500" maxW="600px">
                Explore stories from Reddit's most engaging communities
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={6}>
              {[
                { name: 'nosleep', icon: '👻', members: '15.2M' },
                { name: 'tifu', icon: '🤦', members: '17.1M' },
                { name: 'WritingPrompts', icon: '✍️', members: '14.8M' },
                { name: 'AmItheAsshole', icon: '🤔', members: '3.2M' },
                { name: 'LetsNotMeet', icon: '😰', members: '1.2M' },
                { name: 'relationship_advice', icon: '💕', members: '3.8M' },
              ].map((sub) => (
                <VStack
                  key={sub.name}
                  as={RouterLink}
                  to={`/r/${sub.name}`}
                  spacing={2}
                  p={4}
                  bg={useColorModeValue('white', '#1a1a1b')}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={useColorModeValue('gray.200', '#343536')}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.3s ease"
                  cursor="pointer"
                >
                  <Avatar size="lg" name={sub.name} bg="orange.500">
                    {sub.icon}
                  </Avatar>
                  <VStack spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">r/{sub.name}</Text>
                    <Text fontSize="xs" color="gray.500">{sub.members}</Text>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>

        {/* CTA Section */}
        <Box
          py={16}
          bg={useColorModeValue('orange.500', 'orange.600')}
          color="white"
        >
          <Container maxW="1200px">
            <VStack spacing={6} textAlign="center">
              <Heading size="xl">Ready to Start Your Audio Journey?</Heading>
              <Text fontSize="lg" opacity={0.9} maxW="600px">
                Join thousands of users who have discovered the magic of AI-narrated Reddit stories
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                {isAuthenticated ? (
                  <Button
                    as={RouterLink}
                    to="/home"
                    size="lg"
                    colorScheme="yellow"
                    color="black"
                    leftIcon={<FaPlay />}
                  >
                    Start Listening Now
                  </Button>
                ) : (
                  <Button
                    as={RouterLink}
                    to="/signin"
                    size="lg"
                    colorScheme="yellow"
                    color="black"
                    leftIcon={<FaUsers />}
                  >
                    Get Started
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  color="white"
                  borderColor="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  Learn More
                </Button>
              </Stack>
            </VStack>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          py={8}
          bg={useColorModeValue('gray.100', '#161617')}
          borderTop="1px solid"
          borderColor={useColorModeValue('gray.200', '#343536')}
        >
          <Container maxW="1200px">
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align="center"
              gap={4}
            >
              <HStack spacing={2}>
                <FaReddit size={24} color="#ff4500" />
                <Text fontSize="lg" fontWeight="bold" color="orange.500">
                  Threadist
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                © 2024 Threadist. Powered by Reddit API and AI narration.
              </Text>
            </Flex>
          </Container>
        </Box>
      </Box>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={onWaitlistClose} />
    </>
  );
}