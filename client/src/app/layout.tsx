import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutrifyS",
  description: "NutrifyS - Manage your Healthy Habits",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
        <body className="antialiased">
          <ToastContainer position="bottom-right" autoClose={3000} />
          {children}
        </body>
      </html>
  );
}
