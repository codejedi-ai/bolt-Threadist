import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaReddit } from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WaitlistModal from './waitlist/WaitlistModal';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const location = useLocation();
  const bg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  const isLandingPage = location.pathname === '/';

  const { isOpen: isWaitlistOpen, onOpen: onWaitlistOpen, onClose: onWaitlistClose } = useDisclosure();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <Box
        as="nav"
        bg={bg}
        px={4}
        py={2}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        borderBottom="1px solid"
        borderColor={borderColor}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center" w="full" px={4}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <HStack spacing={2}>
              <FaReddit size={32} color="#ff4500" />
              <Text fontSize="xl" fontWeight="bold" color="orange.500">
                Threadist
              </Text>
            </HStack>
          </Link>

          {!isLandingPage && (
            <Box flex={1} maxW="600px" mx={8}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search stories, subreddits..."
                  bg={useColorModeValue('gray.50', '#272729')}
                  border="1px solid"
                  borderColor={useColorModeValue('gray.200', '#343536')}
                  _focus={{
                    borderColor: 'orange.500',
                    boxShadow: '0 0 0 1px #dd6b20',
                  }}
                />
              </InputGroup>
            </Box>
          )}

          <HStack spacing={4} align="center">
            {isLandingPage && !isAuthenticated && (
              <>
                <Button
                  as={RouterLink}
                  to="/home"
                  variant="ghost"
                  color="orange.500"
                >
                  Browse Stories
                </Button>
                <Button
                  variant="ghost"
                  onClick={onWaitlistOpen}
                >
                  Join Waitlist
                </Button>
                <Button
                  as={RouterLink}
                  to="/signin"
                  variant="outline"
                >
                  Sign In
                </Button>
                <Button
                  as={RouterLink}
                  to="/signin"
                  colorScheme="orange"
                  size="sm"
                >
                  Sign Up
                </Button>
              </>
            )}

            {isLandingPage && isAuthenticated && user && (
              <Button
                as={RouterLink}
                to="/home"
                colorScheme="orange"
              >
                Go to App
              </Button>
            )}

            {!isLandingPage && isAuthenticated && user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    size="sm"
                    name={user.email}
                    bg="orange.500"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            {!isLandingPage && !isAuthenticated && !isLoading && (
              <>
                <Button
                  as={RouterLink}
                  to="/signin"
                  variant="ghost"
                >
                  Sign In
                </Button>
                <Button
                  as={RouterLink}
                  to="/signin"
                  colorScheme="orange"
                  size="sm"
                >
                  Sign Up
                </Button>
              </>
            )}

            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
          </HStack>
        </Flex>
      </Box>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={onWaitlistClose}
      />
    </>
  );
}
