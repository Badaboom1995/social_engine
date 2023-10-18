// const { supabase } = require('../supabase');
import { supabase } from '@/supabase'

const { getRequests } = require('./getRequests')

import { RequestType } from '../model'

export const getWeekActiveUsers = async () => {
  try {
    const requests = await getRequests()
    const telegrams = requests.map((request: RequestType) => request.telegram)
    const { data: users, error: usersError } = await supabase
      .from('Users')
      .select('*')
      .in('telegram', telegrams)
    if (usersError) {
      throw new Error(usersError.message)
    }
    return users
  } catch (e) {
    console.log(e)
    return []
  }
}
