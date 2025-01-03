import Image from "next/image";

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  imageSrc: string;
}

export default function AchievementCard({
  title,
  description,
  date,
  imageSrc,
}: AchievementCardProps) {
  return (
    <div className="relative group rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <Image
        src={imageSrc}
        alt={title}
        layout="responsive"
        width={400}
        height={300}
        className="w-full h-auto object-cover"
      />

      <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col justify-center items-center text-center text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-sm mb-2">{description}</p>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
    </div>
  );
}
