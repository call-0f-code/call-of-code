import { FloatingNavbar } from "@/components/Navbar";
import { ThemeProvider, ThemeSwitcher } from "@/components/ui/theme-provider";
import { About } from "@/components/About";
import { HomePage } from "@/components/Home";
import './globals.css'

export default function Main() {
  return (
    <div>
      <ThemeProvider >
      <div>
        <HomePage />
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
      <div>
        <div>
          <FloatingNavbar />
        </div>
        <div id ="about">
          <About />
        </div>
      </div>
    </ThemeProvider>
    
    </div>
      
  );
}

