import { About } from "@/components/About";
import { HomePage } from "@/components/Home";


export default function Main() {
  return (
    <div>
      <div>
        <HomePage />
      </div>
      <div>
        <div id ="about">
          <About />
        </div>
      </div>
    
    </div>
      
  );
}

