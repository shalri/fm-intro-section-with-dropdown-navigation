import Image from "next/image";
import { runnerLogos } from "@/lib/data";

export default function Runner() {
  return (
    <footer className="">
      <ul className="flex">
        {runnerLogos.map((logo) => (
          <li className="relative size-20" key={logo.company}>
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
