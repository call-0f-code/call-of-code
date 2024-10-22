import Image from 'next/image'
import { Github, Linkedin } from 'lucide-react'

export default function Component() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-4">
        <div className="text-4xl font-bold text-muted-foreground">&lt;&gt; COC &lt;/&gt;</div>
      </header>
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=200&width=400"
            width={400}
            height={200}
            alt="Members group photo"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <h1 className="text-4xl font-bold tracking-wider text-foreground">
              <span className="text-muted-foreground"></span> MEMBERS_
            </h1>
          </div>
        </div>
        
        <div>
          <div className="w-full bg-muted h-2 rounded-full">
            <div className="bg-primary h-full w-3/4 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
            <Image
              src="/placeholder.svg?height=200&width=200"
              width={200}
              height={200}
              alt="Member profile"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Shivaji Raut</h3>
            </div>
          </div>
          <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
            <Image
              src="/placeholder.svg?height=200&width=200"
              width={200}
              height={200}
              alt="Member profile"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Shivaji Raut</h3>
            </div>
          </div>
          <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md w-[300px]">
      <Image
        src="/placeholder.svg?height=200&width=300"
        width={300}
        height={200}
        alt="Member profile"
        className="w-full h-48 object-cover"
      />
       <div className="p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Shivaji Raut</h3>
          <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
            </button>
           <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
             </button>
            </div>
           </div>
          </div>
        </div>
      </main>
    </div>
  )
}