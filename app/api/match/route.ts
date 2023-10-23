import { NextResponse } from 'next/server'
import { runMatching } from '@/matching/matching'
import { moveRequestsToNextWeek } from '@/utils/moveRequestsToNextWeek'
import { wait } from '@/utils/wait'

export async function POST() {
  await moveRequestsToNextWeek()
  console.log('wait...')
  await wait(1000)
  const res = await runMatching()
  return NextResponse.json(res, { status: 200 })
}
