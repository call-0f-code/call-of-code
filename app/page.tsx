
import Footer from "@/components/Footer";
import HeroSection from "@/components/Home";
import AboutUs from "@/components/About";

export const runtime = "edge";
export default function Main() {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <AboutUs />
      <div>
        <div className="w-full h-full">
        <div className="mx-5">
       
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