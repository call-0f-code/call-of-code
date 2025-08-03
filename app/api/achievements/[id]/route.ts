// app/api/achievements/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';


export const runtime = 'edge';

interface Member {
  member: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
  };
}

interface ApiAchievementDetail {
  id: number;
  title: string;
  description: string;
  achievedAt: string;
  imageUrl: string;
  createdById: string;
  createdAt: string;
  updatedById: string;
  updatedAt: string;
  members: Member[];
  createdBy: {
    id: string;
    name: string;
  };
  updatedBy: {
    id: string;
    name: string;
  };
}

interface ApiDetailResponse {
  success: boolean;
  data: ApiAchievementDetail;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const achievementId = params.id;

    if (!process.env.API_BASE_URL) {
        throw new Error('API_BASE_URL environment variable is not configured');
    }

    // Fetch achievement details from your API
    const response = await fetch(`${process.env.API_BASE_URL}/api/v1/achievements/${achievementId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 600 } // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiData: ApiDetailResponse = await response.json();

    if (!apiData.success || !apiData.data) {
      throw new Error('Invalid API response format');
    }

    // Transform member data to match your component format
    const transformedMembers = apiData.data.members.map(memberWrapper => ({
      name: memberWrapper.member.name,
      image: memberWrapper.member.profilePhoto || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
    }));

    return NextResponse.json({
      success: true,
      members: transformedMembers
    });

  } catch (error) {
    console.error('Error fetching achievement details:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch achievement details',
        members: []
      },
      { status: 500 }
    );
  }
}