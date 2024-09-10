"use client";
import Image from "next/image";
import { runnerLogos } from "@/lib/data";
import { cn } from "@/lib/utils";
import Ticker from "framer-motion-ticker";
import { useState } from "react";

export default function Runner() {
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <footer className="mt-12 w-full overflow-hidden sm:mt-[110px]">
      <ul className="flex items-center gap-x-8">
        <Ticker
          duration={20}
          isPlaying={!isPlaying}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {runnerLogos.map((logo) => (
            <li
              className={cn(
                "relative ml-8 h-[25px] sm:h-[28px]",
                logo.company === "Databiz" && "w-[80px] sm:w-[112px]",
                logo.company === "Audiophile" &&
                  "w-[54px] sm:h-[35px] sm:w-[100px]",
                logo.company === "Meet" &&
                  "h-[25px] w-[60px] sm:h-[28px] sm:w-[86px]",
                logo.company == "Maker" &&
                  "h-[25px] w-[58px] sm:h-[28px] sm:w-[86px]",
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
