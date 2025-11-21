import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MPS Group - Industrial Services Excellence',
  description:
    'Celebrating 20 years of industrial leadership in the Western Canadian Sedimentary Basin. 136 acres of fabrication, modular assembly, and supply chain solutions.',
  keywords: [
    'MPS Group',
    'Industrial Fabrication',
    'Modular Assembly',
    'Oil and Gas Services',
    'Western Canada',
    'Steel Fabrication',
    'PipeVault',
  ],
  authors: [{ name: 'MPS Group' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'MPS Group - Industrial Services Excellence',
    description: '136 Acres. $0 Storage. Supply Chain Certainty Starts Here.',
    url: 'https://mpsgroup.ca',
    siteName: 'MPS Group',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'MPS Group Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
