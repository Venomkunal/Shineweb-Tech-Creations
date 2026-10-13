
import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header/Header";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: {
    default: "Shineweb Tech Creations",
    template: "%s | Shineweb Tech Creations",
  },
  description:
    "Enterprise IT hardware, software licensing, networking, cybersecurity, cloud and web development solutions.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
