import Image from "next/image";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="w-full relative">
        {/* Hero Image with Text Overlay */}
        <div className="relative w-full h-[70vh]">
          <Image 
            src="/hero-image.webp" 
            alt="hero" 
            fill
            className="object-cover"
            priority
          />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-center text-white">
            <p className="text-4xl md:text-5xl font-bold mb-4">MARPU - THE CHANGE NGO</p>
            <p className="text-xl md:text-2xl font-semibold mb-2">
              Together, we can create a brighter future.
            </p>
            <p className="text-lg md:text-xl font-medium">
              We are a non-profit organization that helps the needy.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 p-8 sm:p-12 max-w-4xl mx-auto">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
            Donate Now
            <span className="block text-sm font-normal mt-1">Make a difference today</span>
          </button>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
            Volunteer With Us
            <span className="block text-sm font-normal mt-1">Join our community</span>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}