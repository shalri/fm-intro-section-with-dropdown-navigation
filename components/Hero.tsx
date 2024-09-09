import { heroCopy } from "@/lib/data";
import Image from "next/image";
import Runner from "./Runner";

export default function SandBox() {
  return (
    <main className="flex hidden flex-grow flex-col pb-16">
      <picture className="relative min-h-[288px] w-full">
        <source
          srcSet="/images/image-hero-mobile.png"
          media="(max-width: 640px)"
        />
        <source
          srcSet="/images/image-hero-desktop.png"
          media="(min-width: 641px)"
        />
        <Image
          src="/images/image-hero-mobile.png"
          alt="hero image"
          fill
          className="object-contain"
        />
      </picture>
      <section className="mt-10 flex flex-col items-center justify-center px-[18px] text-center">
        <h1 className="text-nowrap text-[35px] font-bold text-is-almost-black">
          {heroCopy.header}
        </h1>
        <p className="mt-2 leading-[1.65] text-is-medium-gray">
          {heroCopy.body}
        </p>
        <button className="mt-6 rounded-2xl bg-is-almost-black px-6 py-3 text-is-almost-white">
          Learn more
        </button>
      </section>
      {/* <Runner /> */}
    </main>
  );
}
