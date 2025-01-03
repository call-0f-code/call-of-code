import About from "@/components/About";
import Footer from "@/components/Footer";

import Particle  from "@/components/Home";
import { StickyScrollRevealDemo } from "@/components/ui/stickyScrollDemo";

export const runtime = "edge";
export default function Main() {
  return (
    <div>
      <div>
        <Particle />
      </div>
      <div>
        <div className="w-full h-full">
        <StickyScrollRevealDemo />
        <div className="mx-5">
          <About />
          </div>
          <footer className="bg-black dark:bg-white text-gray-300 py-4">
        <div className="container mx-auto">
          <Footer />
        </div>
      </footer>
          
          
        </div>
      </div>
    </div>
  );
}
