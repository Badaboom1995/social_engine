import axios from 'axios'

// translate it to axios request
// await bot.telegram.sendMessage(
//     pair.user.chat_id,
//     `Новая пара! @${pair.partner.telegram}`,
//     {
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: 'Профиль',
//               web_app: {
//                 url: `https://social-engine.vercel.app/profile?chatID=${pair.partner.chat_id}`,
//               },
//             },
//           ],
//         ],
//       },
//     },
// )

export const telegram = {
  sendMessage: async (
    chat_id: string,
    partner_id: string,
    partner_tg: string,
  ) => {
    await axios.post(
      'https://api.telegram.org/bot5888882359:AAGcta__XatJMomOeSNIzTvQ9k5y7ejP8jQ/sendMessage',
      {
        chat_id,
        text: `Новая пара! @${partner_tg}`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Профиль',
                web_app: {
                  url: `https://social-engine.vercel.app/profile?chatID=${partner_id}`,
                },
              },
            ],
          ],
        },
      },
    )
  },
}
