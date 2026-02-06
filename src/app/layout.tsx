import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TECHXAURA 2K26 | Technical Symposium",
  description: "The premier technical symposium - Register now for 12+ events, amazing prizes, and unforgettable experiences.",
  keywords: ["TECHXAURA", "symposium", "technical events", "college fest", "2026"],
  openGraph: {
    title: "TECHXAURA 2K26",
    description: "Ignite Your Tech Spirit - Technical Symposium of the Year",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
        <Providers>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
