import { ExtendedUserType, FindPairProps } from '../types'
// const { filterUsers } = require('./filterUsers');

const pairedBefore = (props: FindPairProps, targetUser: ExtendedUserType) =>
  props.oldPairs.some(
    oldPair =>
      oldPair.includes(<string>targetUser.telegram) &&
      oldPair.includes(<string>props.user.telegram),
  )

const justPaired = (props: FindPairProps, targetUser: ExtendedUserType) =>
  props.pairedUsers.includes(<string>targetUser.telegram) ||
  props.pairedUsers.includes(<string>props.user.telegram)

const samePerson = (props: FindPairProps, targetUser: ExtendedUserType) =>
  targetUser.telegram === props.user.telegram

export const applyFilters = (
  sortedUsers: ExtendedUserType[],
  props: FindPairProps,
): {
  users: ExtendedUserType[]
  status: 'lastChance' | 'noUsers' | 'success'
} => {
  // remove who already met with user
  const baseFiltered = sortedUsers.filter(targetUser => {
    const isPairedBefore = pairedBefore(props, targetUser)
    const isSamePerson = samePerson(props, targetUser)
    return !isPairedBefore && !isSamePerson
  })
  const extendedFiltered = baseFiltered.filter(targetUser => {
    return !justPaired(props, targetUser)
  })
  const result = extendedFiltered.length ? extendedFiltered : baseFiltered
  // TODO:status not correct
  return { users: result, status: 'success' }
}
