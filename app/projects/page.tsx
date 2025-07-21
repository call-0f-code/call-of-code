"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoCard";
import Particles from "@/components/ui/particles";
import { useTheme } from "@/components/ui/theme-provider";

const Skeleton = ({ src }: { src: string }) => (
  <img
    src={src}
    alt="Preview"
    className="w-full h-full object-cover rounded-lg"
  />
);

const ProjectPage = () => {
  const { theme } = useTheme();
  return (
    <>
      <main className="relative container mx-auto px-6 py-10 space-y-12 z-10">
  {/* Background Particles */}
  <Particles
        className="absolute inset-0 -z-10"
        quantity={300}
        color={theme === "dark" ? "#ffffff" : "#000000"} // ← dynamic color
        staticity={30}
        ease={60}
        size={1.75}
      />

  {/* Hero Section */}
  <h1 className="text-6xl flex justify-center font-extrabold tracking-wider text-black dark:text-white drop-shadow-lg">
    Projects
  </h1>

  {/* Progress Bar */}
  <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-3/4 rounded-full animate-pulse"></div>
  </div>

  {/* Bento Grid */}
  <BentoGrid>
    {items.map((item, i) => (
      <BentoGridItem
        key={i}
        title={item.title}
        header={item.header}
        github={item.github}
        live={item.live}
        tooltipItems={item.tooltipItems}
        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
      />
    ))}
  </BentoGrid>
</main>
    </>
  );
};


const items = [
  {
    title: "The Dawn of Innovation",
    header: <Skeleton src="https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_640.jpg" />,
    github: "https://github.com/example/project1",
    live: "https://example.com/project1",
    tooltipItems: [
      {
        id: 1,
        name: "Alex Chen",
        designation: "Lead Developer",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 2,
        name: "Sarah Kim",
        designation: "UI/UX Designer",
        image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 3,
        name: "Mike Johnson",
        designation: "Backend Engineer",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    ],
  },
  {
    title: "The Digital Revolution",
    header: <Skeleton src="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800" />,
    github: "https://github.com/example/project2",
    live: "https://example.com/project2",
    tooltipItems: [
      {
        id: 4,
        name: "Emma Davis",
        designation: "Product Manager",
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 5,
        name: "James Wilson",
        designation: "DevOps Engineer",
        image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    ],
  },
  {
    title: "The Art of Design",
    header: <Skeleton src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800" />,
    github: "https://github.com/example/project3",
    live: "https://example.com/project3",
    tooltipItems: [
      {
        id: 6,
        name: "Lisa Zhang",
        designation: "Creative Director",
        image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 7,
        name: "David Brown",
        designation: "Graphic Designer",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 8,
        name: "Anna Lee",
        designation: "Brand Strategist",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    ],
  },
  {
    title: "The Power of Communication",
    header: <Skeleton src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800" />,
    github: "https://github.com/example/project4",
    live: "https://example.com/project4",
    tooltipItems: [
      {
        id: 9,
        name: "Tom Garcia",
        designation: "Marketing Lead",
        image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 10,
        name: "Rachel Green",
        designation: "Content Writer",
        image: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    ],
  },
  {
    title: "The Pursuit of Knowledge",
    header: <Skeleton src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800" />,
    github: "https://github.com/example/project5",
    live: "https://example.com/project5",
    tooltipItems: [
      {
        id: 11,
        name: "Dr. Smith",
        designation: "Research Lead",
        image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 12,
        name: "Prof. Johnson",
        designation: "Data Scientist",
        image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 13,
        name: "Maya Patel",
        designation: "ML Engineer",
        image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 14,
        name: "Kevin Liu",
        designation: "Research Assistant",
        image: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    ],
  },
  {
    title: "The Joy of Creation",
    header: <Skeleton src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" />,
    github: "https://github.com/example/project6",
    live: "https://example.com/project6",
    tooltipItems: [
      {
        id: 15,
        name: "Sofia Rodriguez",
        designation: "Creative Lead",
        image: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 16,
        name: "Marcus Thompson",
        designation: "Art Director",
        image: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    ],
  },
  {
    title: "The Spirit of Adventure",
    header: <Skeleton src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800" />,
    github: "https://github.com/example/project7",
    live: "https://example.com/project7",
    tooltipItems: [
      {
        id: 17,
        name: "Jake Adventure",
        designation: "Explorer",
        image: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 18,
        name: "Luna Explorer",
        designation: "Travel Guide",
        image: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      {
        id: 19,
        name: "Max Journey",
        designation: "Adventure Photographer",
        image: "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    ],
  },
];

export default ProjectPage;