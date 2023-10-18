import { ExtendedUserType, FilterFunction, FindPairProps } from '../types'

export function filterUsers(
  filters: Record<string, FilterFunction>,
  users: ExtendedUserType[],
  props: FindPairProps,
) {
  let filteredUsers = [...users]
  for (const filterName in filters) {
    const currentUsers = filters[filterName]?.({
      ...props,
      currentUsers: filteredUsers,
    })
    filteredUsers = currentUsers || []
  }
  return filteredUsers
}
