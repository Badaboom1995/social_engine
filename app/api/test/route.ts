import { bot } from '@/bot'
import { badavooChatId } from '@/consts'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  bot.telegram.sendMessage(badavooChatId, 'Тест!')
  return NextResponse.json('Success', { status: 200 })
}
