import { bot } from '@/bot'
import { BestPairType } from '@/types'
import { badavooChatId } from '@/consts'

export const sendPairs = async (pairs: BestPairType[]) => {
  for (const pair of pairs) {
    await bot.telegram.sendMessage(
      badavooChatId,
      `(Новая пара! @${pair.partner.telegram}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Профиль',
                web_app: {
                  url: `https://social-engine.vercel.app/profile?chatID=${pair.partner.chat_id}`,
                },
              },
            ],
          ],
        },
      },
    )
    await bot.telegram.sendMessage(
      badavooChatId,
      `Новая пара! @${pair.user.telegram}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Профиль',
                web_app: {
                  url: `https://social-engine.vercel.app/profile?chatID=${pair.user.chat_id}`,
                },
              },
            ],
          ],
        },
      },
    )
  }
}
