"use client";
import Image from "next/image";
import { runnerLogos } from "@/lib/data";
import { cn } from "@/lib/utils";
import Ticker from "framer-motion-ticker";
import { useState } from "react";

export default function Runner() {
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <footer className="mt-12">
      <ul className="flex items-center justify-between gap-x-2 px-[18px]">
        <Ticker
          duration={20}
          isPlaying={isPlaying}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {runnerLogos.map((logo) => (
            <li
              className={cn(
                "relative mx-2 h-[24px] w-[58px]",
                logo.company === "Databiz" && "h-[25px] w-[80px]",
                logo.company === "Audiophile" && "h-[25px] w-[54px]",
                logo.company === "Meet" && "h-[25px] w-[60px]",
                logo.company == "Maker" && "[h-25px] w-[58px]",
              )}
              key={logo.company}
            >
              <Image
                src={logo.img}
                alt={logo.company}
                fill
                className="object-contain"
              />
            </li>
          ))}
        </Ticker>
      </ul>
    </footer>
  );
}
