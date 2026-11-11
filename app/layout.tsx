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
              (function() {
                if (typeof window === 'undefined') return;
                // Suppress browser extension hydration mismatch noise (Bitdefender, Grammarly, etc.)
                const originalError = console.error;
                console.error = function(...args) {
                  const str = args.map(function(a) {
                    return typeof a === 'string' ? a : (a && a.message) ? a.message : '';
                  }).join(' ');
                  if (
                    str.indexOf('bis_skin_checked') !== -1 ||
                    (str.indexOf('hydrated') !== -1 && str.indexOf('attributes of the server rendered HTML') !== -1) ||
                    (str.indexOf('Hydration') !== -1 && str.indexOf('attribute') !== -1)
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };

                // Remove dev error overlay portal if triggered by extension attributes
                const removePortal = function() {
                  document.querySelectorAll('nextjs-portal').forEach(function(el) {
                    el.remove();
                  });
                };
                if (typeof MutationObserver !== 'undefined') {
                  new MutationObserver(removePortal).observe(document.documentElement, {
                    childList: true,
                    subtree: true,
                  });
                }
              })();
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
