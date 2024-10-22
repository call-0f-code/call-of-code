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
    <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md w-[335px]">
      <Image
        src={imageSrc}
        width={300}
        height={200}
        alt={`${name}'s profile`}
        className="w-full h-72 object-cover"
      />
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex space-x-2">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <LinkedinIcon className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  )
}