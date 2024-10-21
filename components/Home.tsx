// 'use client'

// import { useEffect, useState } from "react"
// import Particles from "@/components/ui/particles"

// function ParticlesDemo() {
//   const [isDarkTheme, setIsDarkTheme] = useState(false)
//   const [color, setColor] = useState("#000000")

//   useEffect(() => {
//     setColor(isDarkTheme ? "#ffffff" : "#000000")
//   }, [isDarkTheme])

//   const toggleTheme = () => {
//     setIsDarkTheme(prev => !prev)
//   }

//   return (
//     <div className={`relative flex h-screen w-full flex-col items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
//       <span className={`pointer-events-none relative z-10 whitespace-pre-wrap bg-gradient-to-b ${isDarkTheme ? 'from-white to-gray-400' : 'from-black to-gray-600'} bg-clip-text text-center text-8xl font-semibold leading-none text-transparent`}>
//         &lt;&gt; CALL OF CODE &lt;/&gt;
//       </span>
//       <button
//         onClick={toggleTheme}
//         className={`mt-8 px-4 py-2 rounded-md ${isDarkTheme ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} transition-colors duration-300`}
//       >
//         Toggle Theme
//       </button>
//       <Particles
//         className="absolute inset-0"
//         quantity={150}
//         ease={80}
//         size={2.0}
//         color={color}
//         refresh
//       />
//     </div>
//   )
// }

// export default ParticlesDemo


'use client'

import { useEffect, useState } from "react"
import Particles from "@/components/ui/particles"

function ParticlesDemo() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [color, setColor] = useState("#000000")

  useEffect(() => {
    setColor(isDarkTheme ? "#ffffff" : "#000000")
  }, [isDarkTheme])

  return (
    <div className={`relative flex h-screen w-full flex-col items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <span className={`pointer-events-none relative z-10 whitespace-pre-wrap bg-gradient-to-b ${isDarkTheme ? 'from-white to-gray-400' : 'from-black to-gray-600'} bg-clip-text text-center text-8xl font-semibold leading-none text-transparent`}>
        &lt;&gt; CALL OF CODE &lt;/&gt;
      </span>
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={80}
        size={2.0}
        color={color}
        refresh
      />
    </div>
  )
}

export default ParticlesDemo