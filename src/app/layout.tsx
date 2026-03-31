import type { Metadata } from "next";
import "./globals.css";
import { AgentProvider } from "@/context/AgentContext";
import CommandCenter from "@/components/agent/CommandCenter";
import CommandTrigger from "@/components/agent/CommandTrigger";

export const metadata: Metadata = {
  title: "Lucy Sees | UI/UX Designer & Digital Curator",
  description:
    "Senior UI/UX Designer & Photographer crafting high-impact digital experiences. AI-powered portfolio — ask anything.",
  openGraph: {
    title: "Lucy Sees | UI/UX Designer",
    description: "AI-orchestrated portfolio. Type ⌘K to navigate.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-surface overflow-x-hidden">
        <AgentProvider>
          {children}
          {/* Overlays rendered at root level so they sit above everything */}
          <CommandCenter />
          <CommandTrigger />
        </AgentProvider>
      </body>
    </html>
  );
}
