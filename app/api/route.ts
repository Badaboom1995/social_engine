import { NextResponse, NextRequest } from 'next/server'
import { Telegraf } from 'telegraf'
import { Update } from '@telegraf/types'

const bot = new Telegraf(process.env.BOT_TOKEN || '')

export async function POST(request: any) {
  // Do whatever you want
  try {
    console.log(request.body.json())
    // await bot.telegram.sendMessage('208165379', request)
  } catch (error) {}
  // @ts-ignore
  // await bot.telegram.sendMessage('208165379', request)
  // console.log(request)
  return NextResponse.json({ request }, { status: 200 })
}
export async function GET(request: NextRequest) {
  // Do whatever you want
  try {
    console.log(request.body)
    // await bot.telegram.sendMessage('208165379', request)
  } catch (error) {}
  // @ts-ignore
  // await bot.telegram.sendMessage('208165379', request)
  // console.log(request)
  return NextResponse.json({ request }, { status: 200 })
}
