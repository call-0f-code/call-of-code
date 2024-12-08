import Image from 'next/image'
import { GithubIcon, LinkedinIcon } from 'lucide-react'

interface MemberscardProps {
  name: string
  imageSrc: string
  githubLink: string
  linkedinLink: string
}

export default function Memberscard({
  name = "Shivaji Raut",
  imageSrc = "/placeholder.svg?height=200&width=300",
  githubLink = "#",
  linkedinLink = "#"
}: MemberscardProps) {
  return (
    <div className="relative bg-card text-card-foreground rounded-lg overflow-hidden shadow-md w-[300px] group">
      <div className="relative">
        <Image
          src={imageSrc}
          width={300}
          height={200}
          alt={`${name}'s profile`}
          className="w-full h-72 object-cover transition-transform duration-300 ease-in-out group-hover:blur-sm group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <GithubIcon className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <LinkedinIcon className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  )
}
