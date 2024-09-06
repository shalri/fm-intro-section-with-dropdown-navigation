import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Intro Section With Dropdown Navigation | FScode",
  description:
    "Solution to Intro Section With Dropdown Navigation challenge from Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.className} flex min-h-screen flex-col scroll-smooth antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
