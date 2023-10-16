import { mockTelegramData } from '@/consts'

export const getTgData = () => {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    if (window.Telegram) return window.Telegram.WebApp.initDataUnsafe
    return mockTelegramData
  }
}
