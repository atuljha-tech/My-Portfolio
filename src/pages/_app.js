// pages/_app.js
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Navbar with primary blue background */}
        <Navbar className="bg-blue-600 text-white shadow-md" />

        {/* Main content area with soft gray section background */}
        <main className="flex-1 bg-gray-50">
          <Component {...pageProps} />
        </main>

        {/* Footer with deep navy background */}
        <Footer className="bg-blue-900 text-gray-100" />
      </div>
    </SessionProvider>
  );
}
