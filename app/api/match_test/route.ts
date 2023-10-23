import { NextResponse } from 'next/server'
import { bot } from '@/bot'

export function GET() {
  bot.telegram.sendMessage(208165379, 'CALLED?!')
  return NextResponse.json({ hello: 'world' })
}
