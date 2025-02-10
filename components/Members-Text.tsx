import Image from "next/image";
import Memberscard from "@/components/ui/members-card";

const members = [
  {
    name: "Sarvesh Shahane (President)",
    imageSrc: "/sarvesh.jpg",
    githubLink: "https://github.com/This-Is-My-GitHub-Account",
    linkedinLink: "https://www.linkedin.com/in/sarveshshahane/?originalSubdomain=in",
  },
  {
    name: "Vansh Waldeo (Vice President)",
    imageSrc: "/vansh.jpg",
    githubLink: "https://github.com/VanshKing30",
    linkedinLink: "https://www.linkedin.com/in/vansh-waldeo-81ab31285/",
  },
  {
    name: "Shivaji Raut (CP Head)",
    imageSrc: "/shivaji.jpg",
    githubLink: "https://github.com/shivaji43",
    linkedinLink: "https://www.linkedin.com/in/shivajiraut/",
  },
  {
    name: "Aditya Modak (Secretary)",
    imageSrc: "/modak.jpg",
    githubLink: "https://github.com/shivaji43",
    linkedinLink: "https://www.linkedin.com/in/aditya-modak-42a684250/",
  },
  {
    name: "Sanica Chorey (Secratary)",
    imageSrc: "/sanica.jpg",
    githubLink: "https://github.com/shivaji43",
    linkedinLink: "https://www.linkedin.com/in/swaraj-pawar-webdev/",
  },
  {
    name: "Swaraj Pawar",
    imageSrc: "/swaraj.jpg",
    githubLink: "https://github.com/Swaraj-23",
    linkedinLink: "https://www.linkedin.com/in/swaraj-pawar-webdev/",
  },
];

export default function PageCard() {
  return (
    <div className="relative min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
      {/* Background overlay */}
      <div className="absolute inset-0 pointer-events-none dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen text-foreground">
        {/* Header */}
        <header className="flex justify-center items-center p-6">
          <div className="text-4xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            &lt;&gt; COC &lt;/&gt;
          </div>
        </header>

        {/* Main Section */}
        <main className="container mx-auto px-6 py-10 space-y-12">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/coc.jpg"
              width={800}
              height={400}
              alt="Members group photo"
              className="w-full h-64 object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-6xl font-extrabold tracking-wider text-white drop-shadow-lg">
                MEMBERS
              </h1>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-3/4 rounded-full animate-pulse"></div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <div
                key={index}
              >
                <Memberscard
                  name={member.name}
                  imageSrc={member.imageSrc}
                  githubLink={member.githubLink}
                  linkedinLink={member.linkedinLink}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
