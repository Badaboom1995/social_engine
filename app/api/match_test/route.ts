import { NextResponse } from 'next/server'
import { bot } from '@/bot'
import { badavooChatId } from '@/consts'

export function GET() {
  bot.telegram.sendMessage(badavooChatId, 'CALLED!')
  return NextResponse.json({ hello: 'world' })
}
