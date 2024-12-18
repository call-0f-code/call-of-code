import AchievementCard from "./ui/achivement-card";

const achievements = [
  {
    title: "Winner of Hunar Intern Web Development Hackathon",
    description: "Developed the award-winning healthcare website, WellnessWave.",
    date: "August 2024",
    imageSrc: "/Hunar.jpg",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
  },
];

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-6xl text-center font-bold mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
        Achievements
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            title={achievement.title}
            description={achievement.description}
            date={achievement.date}
            imageSrc={achievement.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
