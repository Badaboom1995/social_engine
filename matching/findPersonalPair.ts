import {
  BestPairType,
  FindPairProps,
  ExtendedUserType,
  NonEmptyArray,
} from '../types'
const { applyFilters } = require('./applyFilters')

export const getBestMatch = (
  props: FindPairProps,
  filteredUsers: NonEmptyArray<ExtendedUserType>,
): BestPairType => {
  const { user } = props
  const bestMatch = { user, partner: filteredUsers[0], score: 1 }
  if (!user) return bestMatch
  filteredUsers.forEach(targetUser => {
    let currentScore = 0
    const userProfit = user?.profit_level || 0
    const targetUserProfit = targetUser?.profit_level || 0
    const profitDiff = userProfit - targetUserProfit
    if (profitDiff === 0) currentScore += 100
    if (profitDiff > 50) currentScore -= 100
    if (targetUser.location === user.location) {
      currentScore += 1000
    }
    user?.hobbies?.split(',').forEach((hobby: string) => {
      const targetHobbies = targetUser?.hobbies?.split(',') || []
      if (targetHobbies.includes(hobby)) {
        currentScore += (10 - userProfit / 10) * 1
      }
    })
    user?.skills?.split(',').forEach((skill: string) => {
      const targetSkills = targetUser?.skills?.split(',') || []
      if (targetSkills.includes(skill)) {
        currentScore += (userProfit / 10) * 1 + 1
      }
    })
    if (bestMatch.score < currentScore) {
      bestMatch.score = currentScore
      bestMatch.partner = targetUser
    }
  })
  return bestMatch
}

export function findPair(props: FindPairProps): BestPairType | null {
  const { sortedUsers } = props
  let bestMatch: BestPairType

  const filteredResponse = applyFilters(sortedUsers, props)
  if (!filteredResponse.users.length) return null

  bestMatch = getBestMatch(props, filteredResponse.users)
  bestMatch.user.telegram && props.pairedUsers.push(bestMatch.user.telegram)
  props.pairedUsers.push(<string>bestMatch.partner.telegram)
  return bestMatch
}
