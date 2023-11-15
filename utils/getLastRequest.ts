import { supabase } from '@/supabase'

export const getLastRequest = async (telegram: string) => {
  const res = await supabase
    .from('Requests')
    .select('*')
    .eq('telegram', telegram)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return res
}
