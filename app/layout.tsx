import type { Metadata } from "next";
import { ThemeProvider, ThemeSwitcher } from "@/components/ui/theme-provider";
import { FloatingNavbar } from "@/components/Navbar";
import localFont from "next/font/local";
import AuthProvider from "@/components/ui/auth-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Call of Code",
  description: "Official Website for Call of Code Programming Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <ThemeProvider>
          <div className="fixed top-4 right-4 z-50">
            <ThemeSwitcher />
          </div>
          <div>
            <FloatingNavbar />
          </div>
        </ThemeProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
