import About from "@/components/About";

import Particle  from "@/components/Home";


export default function Main() {
  return (
    <div>
      <div>
        <Particle />
      </div>
      <div>
        <div className="w-full h-full">
          <About />
          
        </div>
    
      </div>
    
    </div>
      
  );
}

