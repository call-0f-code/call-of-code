'use client'

import { useEffect, useState } from "react"
import Particles from "@/components/ui/particles"

export default function ParticlesDemo() {
  const [color, setColor] = useState("#000000")

  useEffect(() => {
    const updateColor = () => {
      const isDarkTheme = document.documentElement.classList.contains('dark')
      setColor(isDarkTheme ? "#ffffff" : "#000000")
    }
    updateColor()
    const observer = new MutationObserver(updateColor)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      <span className="pointer-events-none relative z-10 whitespace-pre-wrap bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent">
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