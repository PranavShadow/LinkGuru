import type { Metadata } from "next";
import {Space_Grotesk} from "next/font/google";
import "./globals.css";
import Providers from "../components/providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LinkGuru",
  description: "Turn Chaos into Order",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>

        {children}
        </Providers>
        </body>
    </html>
  );
}
