import { bot } from '@/bot'
import { BestPairType } from '@/types'
import { badavooChatId } from '@/consts'
import { supabase } from '@/supabase'

function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export const sendPairs = async (pairs: BestPairType[]) => {
  await bot.telegram.sendMessage(badavooChatId, 'Start sending pairs')
  for (const pair of pairs) {
    if (!pair.user.chat_id || !pair.partner.chat_id) {
      await bot.telegram.sendMessage(
        badavooChatId,
        `Error: ${pair.user.telegram} ${pair.partner.telegram}`,
      )
      continue
    }
    await supabase.from('Pairs').insert([
      {
        user: pair.user.telegram,
        partner: pair.partner.telegram,
      },
    ])
    await bot.telegram.sendMessage(
      pair.user.chat_id,
      `Новая пара! @${pair.partner.telegram}`,
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
    await wait(300)
    await bot.telegram.sendMessage(
      pair.partner.chat_id,
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
    await bot.telegram.sendMessage(
      badavooChatId,
      `Sent: ${pair.user.telegram} ${pair.partner.telegram}`,
    )
  }
}
