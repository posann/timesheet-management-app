// app/providers.tsx
"use client";

import Navbar from "@/components/navbar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    colors: {
      reds: "#F15858",
      blues: "#2775EC",
      lightblues: "#F0F6FF",
      backgrounds: "#F7F8FB",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      {children}
    </ChakraProvider>
  );
}
