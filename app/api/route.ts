import { NextResponse } from 'next/server'

// To handle a GET request to /api
export async function GET(request: any) {
  // Do whatever you want
  return NextResponse.json({ message: 'Root' }, { status: 200 })
}

export async function POST(request: any) {
  // Do whatever you want
  return NextResponse.json({ request }, { status: 200 })
}
