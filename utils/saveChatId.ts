import { supabase } from '@/supabase'

export const saveChatId = async ({
  chatId,
  username,
}: {
  chatId: number
  username: string
}) => {
  // search if user exists
  const { data: user, error: noUser } = await supabase
    .from('Users')
    .select('chat_id')
    .eq('chat_id', chatId)
  if (user) {
    const { error } = await supabase
      .from('Users')
      .update({ chat_id: chatId, telegram: username })
      .eq('chat_id', chatId)
  } else {
    supabase.from('Users').insert({ chat_id: chatId, telegram: username })
  }
}
