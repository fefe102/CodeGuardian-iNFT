import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proof-of-Intelligence Explorer",
  description: "Verify encrypted intelligence, persistent memory, compute history, and replayable iNFT behavior."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="no-print border-b border-white/10 bg-ink/90">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <Link href="/" className="text-sm font-semibold text-white">
              Proof-of-Intelligence Explorer
            </Link>
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <Link href="/verify" className="hover:text-white">
                Verify
              </Link>
              <Link href="/developer" className="hover:text-white">
                SDK
              </Link>
              <Link href="/admin" className="hover:text-white">
                Admin
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
