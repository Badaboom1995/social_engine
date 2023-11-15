import { supabase } from '@/supabase'
import { RequestType } from '@/model'

export const request = {
  create: async (request: Partial<RequestType>) => {
    const res = await supabase.from('Requests').insert(request)
    if (res.error) return 'error'
    return 'success'
  },
  update: async (request: Partial<RequestType>) => {
    const res = await supabase
      .from('Requests')
      .update(request)
      .eq('id', request.id)
    if (res.error) return 'error'
    return 'success'
  },
}
