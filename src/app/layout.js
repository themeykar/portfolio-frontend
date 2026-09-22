import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://josephorji.vercel.app"),
  title: {
    default: "Joseph Orji — Backend Engineer",
    template: "%s | Joseph Orji",
  },
  description:
    "Backend engineer building reliable systems, real-time architectures, and robust APIs.",
  keywords: [
    "Joseph Orji",
    "backend engineer",
    "Python developer",
    "Django developer",
    "Django REST Framework",
    "PostgreSQL",
    "Redis",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Joseph Orji",
    title: "Joseph Orji — Backend Engineer",
    description:
      "Backend engineer building reliable systems, real-time architectures, and robust APIs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joseph Orji — Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Orji — Backend Engineer",
    description:
      "Backend engineer building reliable systems, real-time architectures, and robust APIs.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#05070b",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        {children}
      </body>
    </html>
  );
}
