import { RequestType, UserType } from '../model'
import { CleanPairType, ExtendedUserType } from '../types'
import { getWeekActiveUsers } from '@/utils/getWeeklyActiveUsers'
import { getPairs } from '@/utils/getPairs'
import { getRequests } from '@/utils/getRequests'
// const { getWeekActiveUsers } = require('../../utils/getWeeklyActiveUsers')
// const { getRequests } = require('../../utils/getRequests')
// const { getPairs } = require('../../utils/getPairs')

export async function getInitData(): Promise<{
  users: ExtendedUserType[]
  pairs: CleanPairType[]
} | null> {
  try {
    const users: UserType[] = await getWeekActiveUsers()
    console.log('users', users.length)
    const requests: RequestType[] = await getRequests()
    const pairs: CleanPairType[] = await getPairs()
    const usersWithRequests: ExtendedUserType[] = users.map(user => {
      const userRequest = requests.find(
        request => request.telegram === user.telegram,
      )
      return {
        ...user,
        format: userRequest?.format,
        profit_level: userRequest?.profit_level,
        location: userRequest?.location,
      }
    })
    return { users: usersWithRequests, pairs }
  } catch (e) {
    console.log(e)
    return null
  }
}
