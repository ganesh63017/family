import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const owner = formData.get("owner") as string | null;

    if (!file || !owner) {
      return NextResponse.json({ error: "File and owner are required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    const metadataPath = path.join(process.cwd(), "public/uploads/metadata.json");
    let metadata: any[] = [];
    try {
      const data = await fs.readFile(metadataPath, "utf-8");
      metadata = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet, which is fine
    }

    const newEntry = {
      id: Date.now().toString(),
      owner,
      url: `/uploads/${filename}`,
      uploadedAt: new Date().toISOString()
    };
    metadata.push(newEntry);
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({ success: true, image: newEntry });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const metadataPath = path.join(process.cwd(), "public/uploads/metadata.json");
    const data = await fs.readFile(metadataPath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json([]); 
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID is required." }, { status: 400 });
    }

    const metadataPath = path.join(process.cwd(), "public/uploads/metadata.json");
    let metadata: any[] = [];
    try {
      const data = await fs.readFile(metadataPath, "utf-8");
      metadata = JSON.parse(data);
    } catch (e) {
      return NextResponse.json({ error: "No metadata found." }, { status: 404 });
    }

    const fileIndex = metadata.findIndex((item) => item.id === id);
    if (fileIndex === -1) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    const fileToDelete = metadata[fileIndex];
    
    // Attempt to delete physical file
    const filePath = path.join(process.cwd(), "public", fileToDelete.url);
    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.warn("Could not delete physical file, it might not exist.", e);
    }

    // Remove from metadata
    metadata.splice(fileIndex, 1);
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete file." }, { status: 500 });
  }
}
