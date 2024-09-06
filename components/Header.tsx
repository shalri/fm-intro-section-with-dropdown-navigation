import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="flex w-full items-center px-[18px] py-5" role="banner">
      <Link href="/" aria-label="Homepage">
        <div className="relative h-8 w-[84px]">
          <Image
            src="/images/logo.svg"
            fill
            className="object-contain"
            alt="span logo"
          />
        </div>
      </Link>
      <Navigation />
    </header>
  );
}
