import { About } from "@/components/About";
import HeroSection from "@/components/Home";

export const runtime = "edge";
export default function Main() {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div>
        <div className="w-full h-full">
          <About />
        </div>
      </div>
    </div>
  );
}
