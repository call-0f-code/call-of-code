
// app/achievements/page.tsx (Server Component)
import AchievementsClient from "@/components/Achievement";

// Type definitions
interface ApiAchievement {
  id: number;
  title: string;
  description: string;
  achievedAt: string;
  imageUrl: string;
  createdById: string | null;
  createdAt: string;
  updatedById: string | null;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: ApiAchievement[];
}

interface ClientAchievement {
  id: number;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  teamMembers: Array<{
    id : string;
    name: string;
    image: string;
  }>;
}



async function fetchAchievements(): Promise<ClientAchievement[]> {
  try {
    
    if (!process.env.API_BASE_URL) {
      throw new Error('API_BASE_URL environment variable is not configured');
    }
    const response = await fetch(`${process.env.API_BASE_URL}/api/v1/achievements/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 600 } // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiData: ApiResponse = await response.json();

    if (!apiData.success || !apiData.data) {
      throw new Error('Invalid API response format');
    }

    // Transform API data to match client component format
    const transformedData: ClientAchievement[] = apiData.data.map((achievement) => {
      // Format the date
      const achievedDate = new Date(achievement.achievedAt);
      const formattedDate = achievedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });

      // Handle image URL - use a default if the provided URL is invalid
      let imageSrc = achievement.imageUrl;
      
      // Check if imageUrl is a valid URL, if not use a default
      if (!imageSrc || imageSrc === "Bitspilani.com" || !imageSrc.startsWith('http')) {
        imageSrc = "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800";
      }

      return {
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        date: formattedDate,
        imageSrc: imageSrc,
        teamMembers: [] // Empty initially, will be loaded when card is expanded
      };
    });

    // Sort by date (most recent first) - using achievedAt from API
    return transformedData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

  } catch (error) {
    console.error('Error fetching achievements:', error);
    
    // Return fallback data in case of error
    return [];
  }
}

export default async function AchievementsPage() {
  const achievements = await fetchAchievements();

  return <AchievementsClient achievements={achievements} />;
}