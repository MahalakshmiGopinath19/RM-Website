import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('banner_image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Define the upload directory inside the public directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique name
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const filePath = path.join(uploadDir, filename);

    // Save the file
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error('Error during file upload:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Upload failed', details: message }, { status: 500 });
  }
}
