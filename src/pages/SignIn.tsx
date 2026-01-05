import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Flex,
  VStack,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const bg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/home');
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password);
    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Account created! You can now sign in.');
    }
  };

  const AuthForm = ({ isSignUp }: { isSignUp: boolean }) => (
    <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            bg={useColorModeValue('gray.50', '#272729')}
            border="1px solid"
            borderColor={borderColor}
            _focus={{ borderColor: 'orange.500', boxShadow: '0 0 0 1px #dd6b20' }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignUp ? 'At least 6 characters' : 'Your password'}
              bg={useColorModeValue('gray.50', '#272729')}
              border="1px solid"
              borderColor={borderColor}
              _focus={{ borderColor: 'orange.500', boxShadow: '0 0 0 1px #dd6b20' }}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="orange"
          width="100%"
          type="submit"
          isLoading={isLoading}
          mt={2}
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
      </VStack>
    </form>
  );

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      pt="60px"
      bg={useColorModeValue('#dae0e6', '#0b1426')}
    >
      <Box
        width="100%"
        maxWidth="400px"
        mx="auto"
        p={8}
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing={6}>
          <Heading as="h2" size="lg" textAlign="center" color="orange.500">
            Welcome to Threadist
          </Heading>

          <Text color="gray.500" textAlign="center" fontSize="sm">
            Sign in to save stories and track your listening history
          </Text>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {success && (
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              {success}
            </Alert>
          )}

          <Tabs isFitted variant="enclosed" width="100%">
            <TabList mb={4}>
              <Tab _selected={{ color: 'orange.500', borderColor: 'orange.500' }}>Sign In</Tab>
              <Tab _selected={{ color: 'orange.500', borderColor: 'orange.500' }}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <AuthForm isSignUp={false} />
              </TabPanel>
              <TabPanel p={0}>
                <AuthForm isSignUp={true} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Flex>
  );
}

export default SignIn;
