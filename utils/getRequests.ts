import dayjs from 'dayjs'
import { RequestType } from '../model'
import { supabase } from '@/supabase'

export const getRequests = async (prev?: boolean): Promise<RequestType[]> => {
  let weekBefore = prev ? 2 : 1
  const weekStart = dayjs()
    .subtract(1, 'day')
    .subtract(weekBefore, 'week')
    .startOf('week')
    .add(1, 'day')
  const weekEnd = dayjs()
    .subtract(1, 'day')
    .subtract(weekBefore, 'week')
    .endOf('week')
    .add(1, 'day')

  const { data: requests, error } = await supabase
    .from('Requests')
    .select('*')
    .gt('created_at', weekStart)
    .lt('created_at', weekEnd)
  if (error) {
    throw new Error(error.message)
  }
  return requests
}
