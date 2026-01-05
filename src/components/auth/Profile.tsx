import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Spinner,
  useColorModeValue
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  if (isLoading) {
    return (
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        p={6}
        textAlign="center"
      >
        <Spinner size="lg" color="orange.500" />
        <Text mt={4} color="gray.500">Loading profile...</Text>
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      p={6}
    >
      <HStack spacing={4}>
        <Avatar
          size="lg"
          name={user.email}
          bg="orange.500"
        />
        <VStack align="flex-start" spacing={1}>
          <Text fontSize="xl" fontWeight="bold">
            {user.email?.split('@')[0]}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {user.email}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Profile;
