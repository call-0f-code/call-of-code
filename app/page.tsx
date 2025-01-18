import About  from "@/components/About";
import HeroSection from "@/components/Home";
import EnhancedStickyScrollDemo from "@/components/ui/stickyScrollDemo";

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
          <About />
        </div>
      </div>
    </div>
  );
}
