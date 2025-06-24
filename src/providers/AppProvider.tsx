"use client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { InternacionalizationProvider } from "@/context/internacionalization-context";

export function AppProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <InternacionalizationProvider>
        <Toaster position="top-center" />
        {children}
      </InternacionalizationProvider>
    </ThemeProvider>
  );
}

export default AppProvider;
