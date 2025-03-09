import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BillProvider } from "@/BillContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "apnaSplit",
  description: "Effortless bill splitting—no more math headaches! Just add your bill, and we&apos;ll handle the rest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
          >
          <BillProvider>
            <Navbar/>
            {children}
            <Footer/>
          </BillProvider>
        </body>
    </html>
  );
}
