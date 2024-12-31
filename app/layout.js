import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ContextProvider } from '@/context/AuthContext'
import Navbar from "@/components/Navbar";
import Foot from "@/components/Foot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calender app",
  description: "calender event mangement app by tarun kushwaha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <Navbar/>
          {children}
          <Foot/>
        </ContextProvider>
      </body>
    </html>
  );
}
