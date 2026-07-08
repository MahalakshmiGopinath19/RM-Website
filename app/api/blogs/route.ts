import { NextResponse } from 'next/server';
import { getAllBlogs } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ blogs: [] });
  }
}
