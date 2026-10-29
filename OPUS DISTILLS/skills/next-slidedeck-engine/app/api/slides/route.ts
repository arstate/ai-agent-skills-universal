import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { INITIAL_DECK } from '../../../presets/sampleDecks';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const requestedFile = searchParams.get('file');
    // Scoped strictly to filename within DATA_DIR
    const safeFilename = requestedFile ? path.basename(requestedFile) : 'current-deck.json';
    const filePath = path.join(DATA_DIR, safeFilename);

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch {
      return NextResponse.json(INITIAL_DECK);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read slide deck', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const requestedFile = searchParams.get('file');
    const safeFilename = requestedFile ? path.basename(requestedFile) : 'current-deck.json';
    const filePath = path.join(DATA_DIR, safeFilename);

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');

    return NextResponse.json({ success: true, path: filePath, updatedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save slide deck', details: String(error) },
      { status: 500 }
    );
  }
}
