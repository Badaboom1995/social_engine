import { mockTelegramData } from '@/consts'

export const getTgData = () => {
  // @ts-ignore
  if (window.Telegram) return window.Telegram.WebApp.initDataUnsafe
  return mockTelegramData
}
