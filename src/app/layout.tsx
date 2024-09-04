import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "@/providers";
import { BaseLayout } from "@/components/wraps/base/BaseLayout";
import { ClusterProvider } from "./solana/cluster/cluster-data-access";
import { SolanaProvider } from "./solana/solana-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PAiT | Pre-sale",
  description: "Pre-sale of PAiT Tokens",
  applicationName: "PAiT",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["PAiT DEX", "Pait Token"],
  authors: [{ name: "PAit Team", url: "https://www.pait.fi/team" }],
  creator: "PAiT",
  publisher: "PAiT",
  alternates: {
    canonical: "https://www.pait.fi/",
    languages: {
      "en-US": "https://www.pait.fi/en-US",
      "fi-FI": "https://www.pait.fi/fi-FI",
    },
  },
  openGraph: {
    title: "PAiT Pre-sale",
    description: "Pre-sale of PAiT Tokens",
    url: "https://www.pait.fi/",
    siteName: "PAIT",
    type: "website",
    images: [
      {
        url: "https://www.pait.fi/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PAiT - Pre-sale",
      },
    ],
    locale: "en_US",
  },
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/favicon.png", sizes: "180x180" },
  },
  appleWebApp: {
    capable: true,
    title: "PAiT",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
        <link rel="stylesheet" href="/" />
      </head>
      <body className={inter.className}>
        <ClusterProvider>
          <SolanaProvider>
            <Providers>
              <BaseLayout>{children}</BaseLayout>
            </Providers>
          </SolanaProvider>
        </ClusterProvider>
      </body>
    </html>
  );
}
