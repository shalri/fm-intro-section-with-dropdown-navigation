import Image from "next/image";
import { runnerLogos } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Runner() {
  return (
    <footer className="mt-12">
      <ul className="flex items-center justify-between gap-x-2 px-[18px]">
        {runnerLogos.map((logo) => (
          <li
            className={cn(
              "relative h-[24px] w-[58px]",
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
      </ul>
    </footer>
  );
}
