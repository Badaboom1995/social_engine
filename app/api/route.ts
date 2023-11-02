import { NextResponse } from 'next/server'
import { Telegraf } from 'telegraf'
import { saveChatId } from '@/utils/saveChatId'
import { badavooChatId } from '@/consts'

const bot = new Telegraf(process.env.BOT_TOKEN || '')

const helloMessage = `Привет!👋
Я нетворкинг бот сообщества minders для встреч один на один. Мы объединяем фаундеров, инвесторов, IT профессионалов и просто хороших людей на Бали 🤖

Каждую неделю я буду предлагать тебе для встречи интересного человека, специально подобранного для тебя среди других участников сообщества.

Чтобы принять участие во встречах, нужно заполнить анкету.💡
Если у меня уже есть какие-то данные о тебе, я пропущу соответствующие вопросы.`

export async function POST(request: any) {
  try {
    const res = await request.json()
    const message = res.message.text

    if (message === '/start') {
      const chatId = res.message.from.id
      await saveChatId({
        chatId,
        username: res.message.from.username,
      })
      await bot.telegram.sendMessage(
        badavooChatId,
        `bot started by ${res.message.from.username}`,
      )
      await bot.telegram.sendMessage(chatId, helloMessage)
      bot.telegram
        .sendPhoto(
          chatId,
          'https://res.cloudinary.com/dgpgmk0w7/image/upload/v1688229482/static/profileExample_t6woiu.png',
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Создать профиль',
                    web_app: {
                      url: 'https://social-engine.vercel.app/signup',
                    },
                  },
                ],
              ],
            },
          },
        )
        .catch(err => console.log(err))
    }
  } catch (error) {}
  return NextResponse.json({ request }, { status: 200 })
}
