import Image from 'next/image'
import Memberscard from '@/components/ui/members-card'

export default function PageCard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-center items-center p-4">
        <div className="text-4xl font-bold ">&lt;&gt; COC &lt;/&gt;</div>
      </header>
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="/coc.jpg"
            width={400}
            height={300}
            alt="Members group photo"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <h1 className="text-6xl font-bold tracking-wider text-foreground">
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
        <Memberscard
         name="Shivaji Raut (CP Head)"
         imageSrc='/shivaji.jpg'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
         <Memberscard
         name="Swaraj Pawar(Vice-President)"
         imageSrc='/swaraj.jpg'
         githubLink='https://github.com/swaraj-23'
         linkedinLink='https://www.linkedin.com/in/swaraj-pawar-webdev/' />
         <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
         <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
                  <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
                  <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
                  <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
                  <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
                  <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
                  <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
                  <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />
                  <Memberscard
         name="Shivaji Raut"
         imageSrc='/batman.png'
         githubLink='https://github.com/shivaji43'
         linkedinLink='https://www.linkedin.com/in/shivajiraut/' />

          

        </div>
      </main>
    </div>
  )
}