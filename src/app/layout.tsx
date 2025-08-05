// src/app/layout.tsx
import Navbar from "../components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "../contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><head /><body className={inter.className}>
      <AuthContextProvider>
        <Navbar />
        {children}
      </AuthContextProvider>
    </body></html>
  );
}
