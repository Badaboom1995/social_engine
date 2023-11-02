import { supabase } from '@/supabase'

export const getUserFormDB = async (chat_id: number) => {
  const { data: user, error } = await supabase
    .from('Users')
    .select('*')
    .eq('chat_id', `${chat_id}`)
    .single()
  return { user, error }
}
