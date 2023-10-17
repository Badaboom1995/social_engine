import { supabase } from '@/supabase'

export const userService = {
  get: async (chatId: string) => {
    try {
      const res = await supabase
        .from('Users')
        .select('*')
        .eq('chat_id', chatId)
        .single()
      return res
    } catch (e) {}
  },
}
