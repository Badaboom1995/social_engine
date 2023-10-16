import { NextResponse } from 'next/server'
import { Telegraf } from 'telegraf'
import { Update } from '@telegraf/types'

const bot = new Telegraf(process.env.BOT_TOKEN || '')

export async function POST(request: Update) {
  // Do whatever you want
  try {
    const res = JSON.stringify(request)
    await bot.telegram.sendMessage('208165379', 'Hello World')
  } catch (error) {}
  // @ts-ignore
  await bot.telegram.sendMessage('208165379', request)
  console.log('got post request')
  return NextResponse.json({ request }, { status: 200 })
}
