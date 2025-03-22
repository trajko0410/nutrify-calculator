import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutrifyS Calculator",
  description: "NutrifyS Calculator - Calculate your daily nutrition",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <ToastContainer position="bottom-right" autoClose={3000} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
