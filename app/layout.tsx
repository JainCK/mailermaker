"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Header from "@/components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
