import { supabase } from '@/supabase'

const saveChatId = async (chatId: number) => {
  const { error } = await supabase
    .from('Users')
    .update({ chat_id: chatId })
    .eq('telegram', 123)
}
