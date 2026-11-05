import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dzaky Rayssa Buntoro - AI Engineer & Sales Operations Analyst",
  description:
    "Personal portfolio and Medium-style publishing studio. Explore production web applications, architecture case studies, and engineering articles.",
  keywords: [
    "Dzaky Rayssa Buntoro",
    "AI Engineer",
    "Sales Operations Analyst",
    "NLP",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
  ],
  authors: [{ name: "Dzaky Rayssa Buntoro" }],
  openGraph: {
    title: "Dzaky Rayssa Buntoro - AI Engineer & Sales Operations Analyst",
    description: "Personal portfolio, dynamic CMS, and engineering case studies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const removePortal = () => {
                  document.querySelectorAll('nextjs-portal').forEach((el) => el.remove());
                };
                new MutationObserver(() => removePortal()).observe(document.documentElement, {
                  childList: true,
                  subtree: true,
                });
              }
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#fafafa] text-zinc-900 selection:bg-zinc-900 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
