import { heroCopy } from "@/lib/data";
import Image from "next/image";
import Runner from "./Runner";

export default function SandBox() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center">
      <div className="relative h-[200px] w-full" aria-hidden="true">
        <picture className="">
          <source
            srcSet="/images/image-hero-mobile.png"
            media="(max-width: 640px)"
          />
          <source
            srcSet="/images/image-hero-desktop.png"
            media="(min-width: 641px)"
          />
        </picture>
        <Image
          src="/images/image-hero-mobile.png"
          alt="hero image"
          fill
          className="object-contain"
        />
      </div>
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-zinc-500">{heroCopy.header}</h1>
        <p className="">{heroCopy.body}</p>
        <button className="bg-black text-white">Learn More</button>
      </section>

      <Runner />
    </main>
  );
}
