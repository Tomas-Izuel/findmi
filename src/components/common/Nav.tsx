"use client";

import { Home, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black px-16 md:top-0 md:bottom-auto">
      <div
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between"
        style={{
          clipPath:
            "path('M0,0 H50% Ccalc(50% - 40px),0 calc(50% - 40px),32 calc(50% - 20px),32 S50%,0 calc(50% + 20px),32 Ccalc(50% + 40px),32 calc(50% + 40px),0 100%,0 H100% V100% H0 Z')",
        }}
      >
        {/* Left Icon */}
        <Link
          href="/"
          className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10"
        >
          <Home className="h-6 w-6 text-white" />
          <span className="sr-only">Home</span>
        </Link>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 transform z-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-lg">
            <Link
              href="/music"
              className="flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-105"
            >
              <Image
                src="/icons/findmi.svg"
                alt="FindMi Logo"
                width={24}
                height={24}
                className="h-20 w-20"
              />
              <span className="sr-only">Music</span>
            </Link>
          </div>
        </div>

        {/* Right Icon */}
        <Link
          href="/search"
          className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10"
        >
          <Search className="h-6 w-6 text-white" />
          <span className="sr-only">Search</span>
        </Link>
      </div>
    </nav>
  );
}
