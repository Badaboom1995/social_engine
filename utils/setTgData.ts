import { mockTelegramData } from '@/consts'
//ts ignore file
// @ts-ignore
export const getTgData = () => {
  if (!window) return
  // @ts-ignore
  if (window.Telegram)
    // @ts-ignore
    return window.Telegram.WebApp.initDataUnsafe
  return mockTelegramData
}
