import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Box } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Subreddit from "./pages/Subreddit";
import Story from "./pages/Story";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ 
  config,
  colors: {
    reddit: {
      50: '#fff5f5',
      100: '#fed7d7',
      200: '#feb2b2',
      300: '#fc8181',
      400: '#f56565',
      500: '#e53e3e',
      600: '#c53030',
      700: '#9b2c2c',
      800: '#742a2a',
      900: '#1a202c',
    },
    orange: {
      50: '#fffaf0',
      100: '#feebc8',
      200: '#fbd38d',
      300: '#f6ad55',
      400: '#ed8936',
      500: '#dd6b20',
      600: '#c05621',
      700: '#9c4221',
      800: '#7b341e',
      900: '#652b19',
    }
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0b1426' : '#dae0e6',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
    }),
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider>
        <Router>
          <Box id="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/r/:subreddit" element={<Subreddit />} />
              <Route path="/r/:subreddit/comments/:postId" element={<Story />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}