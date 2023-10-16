import { NextResponse } from 'next/server'
import { Telegraf } from 'telegraf'
import { Update } from '@telegraf/types'

const bot = new Telegraf(process.env.BOT_TOKEN || '')

export async function POST(request: any) {
  // Do whatever you want
  try {
    console.log(request)
    await bot.telegram.sendMessage('208165379', request)
  } catch (error) {}
  // @ts-ignore
  // await bot.telegram.sendMessage('208165379', request)
  // console.log(request)
  return NextResponse.json({ request }, { status: 200 })
}
