"use client";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <header className="mx-auto flex w-full max-w-[1394px] items-center px-[18px] py-5 sm:items-center sm:py-[20px]">
      <Link href="/" aria-label="Homepage">
        <div className="relative h-[1.75rem] w-[84px]">
          <Image
            src="/fm-intro-section-with-dropdown-navigation/images/logo.svg"
            fill
            className="object-contain"
            alt="span logo"
          />
        </div>
      </Link>
      {mounted && <Navigation />}
    </header>
  );
}
