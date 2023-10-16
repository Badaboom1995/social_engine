import { NextResponse } from 'next/server'
import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN || '')

// To handle a GET request to /api
export async function GET(request: any) {
  // Do whatever you want
  await bot.telegram.sendMessage('208165379', 'Hello World')
  return NextResponse.json({ message: 'Root' }, { status: 200 })
}

export async function POST(request: any) {
  // Do whatever you want
  await bot.telegram.sendMessage('208165379', 'Hello World')
  console.log('got post request')
  return NextResponse.json({ request }, { status: 200 })
}
