import { ExtendedUserType } from '../types'
import { findPairs } from './findPairs'
import { getInitData } from './getInitData'
import { getSortedUsers } from './getSortedUsers'
import { sendPairs } from '@/utils/sendPairs'

export async function runMatching() {
  const initData = await getInitData()
  if (!initData) {
    console.log('No data, should be some error')
    return
  }
  // IMPORTANT: Users will be returned joined with their requests
  const { users, pairs: oldPairs } = initData
  const cleanUsers = users.filter((user: ExtendedUserType) => user.telegram)
  const sortedUsers = getSortedUsers(cleanUsers)
  const newPairs = findPairs({ sortedUsers, oldPairs })

  const testedPairs = newPairs.map((pair: any) => {
    const beenPaired = oldPairs.some(
      (oldPair: any) =>
        oldPair.includes(pair.user) && oldPair.includes(pair.partner),
    )
    return {
      ...pair,
      beenPaired,
    }
  })

  if (testedPairs.map((i: any) => i.beenPaired).some((i: any) => i)) {
    console.log('Some pairs have already been paired')
  } else {
    console.log('All clear, ready to send')
    await sendPairs(testedPairs)
    return testedPairs
  }
}
