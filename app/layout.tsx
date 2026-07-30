import type { Metadata } from "next";
import { Inter, Playfair_Display, Pacifico } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bookhaven.vercel.app"),
  title: {
    default: "BookHaven — Premium Digital eBook Store",
    template: "%s — BookHaven",
  },
  description:
    "Discover thousands of premium eBooks across every genre. Read anytime, anywhere on any device. Join 500K+ readers worldwide.",
  keywords: [
    "ebooks",
    "digital books",
    "online bookstore",
    "premium eBooks",
    "BookHaven",
    "reading",
  ],
  openGraph: {
    siteName: "BookHaven",
    type: "website",
    locale: "en_US",
    title: "BookHaven — Premium Digital eBook Store",
    description:
      "Discover thousands of premium eBooks across every genre. Read anytime, anywhere.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookHaven — Premium Digital eBook Store",
    description:
      "Discover thousands of premium eBooks across every genre.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${pacifico.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white font-sans text-gray-900 antialiased">
        <ClerkProvider>
          <ClientLayout>{children}</ClientLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
