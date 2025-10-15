import { ThemeProvider } from "@/components/providers/theme-provider";
import { UserProvider } from "@/contexts/UserContext";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default Providers;
