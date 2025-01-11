import About from "@/components/About";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Home";
import  EnhancedStickyScrollDemo  from "@/components/ui/stickyScrollDemo";

export const runtime = "edge";
export default function Main() {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div>
        <div className="w-full h-full">
        <EnhancedStickyScrollDemo />
        <div className="mx-5">
          <About />
          </div>
          <footer className="bg-white dark:bg-black text-gray-900 py-4">
        <div className="container mx-auto">
          <Footer />
        </div>
      </footer>
          
          
        </div>
      </div>
    </div>
  );
}
