import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppProvider } from '../src/components/context/SidebarContext';
import { Toaster } from "sonner";
import { ChakraProvider, theme } from '@chakra-ui/react'
import "../src/Poppins-Black.ttf";     // Poppins Black

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <AppProvider>
    <Toaster richColors />
    <ChakraProvider theme={theme}>
      <App/>
    </ChakraProvider>
    </AppProvider>
  </React.StrictMode>
);
