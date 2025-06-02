import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { ToastContainer } from "react-toastify";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "One4All-All4One",
  description: "One4All-All4One",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="">
      <body
        className={`${inter.className} bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            <ThemeToggleButton />
            {children}
            <ToastContainer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
