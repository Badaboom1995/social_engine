import { ExtendedUserType } from '../types'

export const getSortedUsers = (
  users: ExtendedUserType[],
): ExtendedUserType[] => {
  const clusters = users.reduce<any>(
    (acc, user) => {
      user = user || {}
      if (user.groups?.includes('Я инвестор')) {
        acc.investors.push(user)
        return acc
      }
      if (user.groups?.includes('Я основатель')) {
        acc.founders.push(user)
        return acc
      }
      if (
        user.groups?.includes('Я творческая личность') ||
        user.groups?.includes('Я специалист')
      ) {
        acc.specialists.push(user)
        return acc
      }
      acc.others.push(user)
      return acc
    },
    {
      investors: [],
      founders: [],
      specialists: [],
      others: [],
    },
  )
  const sortedUsers = [
    ...clusters.investors,
    ...clusters.founders,
    ...clusters.specialists,
    ...clusters.others,
  ]
  return sortedUsers
}
