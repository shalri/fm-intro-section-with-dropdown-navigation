import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      {/* <main className="flex flex-grow flex-col items-center justify-center p-24"> */}
      <Hero />
      {/* </main> */}
      <Footer />
    </>
  );
}
