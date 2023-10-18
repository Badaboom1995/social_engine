import { NextResponse } from 'next/server'
import { runMatching } from '@/matching/matching'

export async function POST() {
  const res = await runMatching()
  return NextResponse.json(res, { status: 200 })
}
