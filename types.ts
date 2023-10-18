import { UserType } from './model'

export type NonEmptyArray<T> = [T, ...T[]]
export type ExtendedUserType = UserType & {
  format?: string | null
  profit_level?: number | null
  location?: string | null
}
export type BestPairType = {
  user: ExtendedUserType
  partner: ExtendedUserType
  score: number
}
export type FilterFunction = (
  props: Omit<FindPairProps, 'sortedUsers' | 'filters'> & {
    currentUsers: ExtendedUserType[]
  },
) => ExtendedUserType[] | null

export type CleanPairType = [string, string]

export type FindPairProps = {
  user: ExtendedUserType
  sortedUsers: ExtendedUserType[]
  pairedUsers: string[]
  oldPairs: CleanPairType[]
  filters?: Record<string, FilterFunction>
}

// export type {
//   BestPairType,
//   NonEmptyArray,
//   ExtendedUserType,
//   FilterFunction,
//   FindPairProps,
// };
