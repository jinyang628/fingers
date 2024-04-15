import { ReactNode } from 'react';
import "../styles/globals.css";
import { Inter as FontSans } from "next/font/google"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="en">
        <div className="">
          <body className={fontSans.className}>{children}</body>
        </div>
      </html>
    );
  }
