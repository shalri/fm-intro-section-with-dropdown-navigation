import { heroCopy } from "@/lib/data";
import Image from "next/image";
import Runner from "./Runner";

export default function Hero() {
  return (
    <main className="grid pb-16 sm:mx-auto sm:mt-10 sm:max-w-[1185px] sm:grid-cols-2 sm:items-start">
      <picture className="relative min-h-[288px] w-full place-self-center sm:col-start-2 sm:ml-auto sm:flex sm:min-h-[638px] sm:w-[82%] lg:place-self-start">
        <source
          srcSet="/fm-intro-section-with-dropdown-navigation/images/image-hero-mobile.png"
          media="(max-width: 640px)"
        />
        <source
          srcSet="/fm-intro-section-with-dropdown-navigation/images/image-hero-desktop.png"
          media="(min-width: 641px)"
        />
        <Image
          src="/fm-intro-section-with-dropdown-navigation/images/image-hero-mobile.png"
          alt="hero image"
          fill
          className="object-contain"
        />
      </picture>
      <section className="sm:itmes-start mt-10 flex flex-col items-center justify-center overflow-hidden px-[18px] text-center sm:row-start-1 sm:mt-0 sm:items-start sm:px-[2.42rem] sm:pt-[102px] sm:text-left">
        <h1 className="w-full text-nowrap text-[35px] font-bold text-is-almost-black sm:text-wrap sm:text-[4.85rem] sm:leading-[1.05]">
          {heroCopy.header}
        </h1>
        <p className="mt-2 max-w-[450px] leading-[1.65] text-is-medium-gray sm:mt-[46px] sm:text-[18px] sm:leading-[1.585]">
          {heroCopy.body}
        </p>
        <button className="mt-6 rounded-2xl border-2 bg-is-almost-black px-6 py-3 text-is-almost-white transition-all duration-300 hover:border-is-almost-black hover:bg-is-almost-white hover:text-is-almost-black sm:mt-[50px] sm:px-[30px] sm:py-[15px] sm:text-[18px]">
          Learn more
        </button>
        <Runner />
      </section>
    </main>
  );
}
