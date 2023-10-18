import {
  BestPairType,
  CleanPairType,
  ExtendedUserType,
  // FilterFunction,
} from '../types'
// const { findPair } = require('./findPersonalPair')
import { findPair } from './findPersonalPair'

// TODO:Filters currently not used
// TODO:In future we can use them for different cases and make different filters set for different users
// TODO:NOW: all filters are in applyFilters.ts
// const filters: Record<string, FilterFunction> = {
// [...100]
// (!)alreadyMet: (props) => props.currentUsers.filter((user) => user.is_member), -> [...20] || throw Error
// justPaired: (props) => props.currentUsers.filter((user) => user.is_member), -> [...20] || null
// checkLocation: (props) => props.currentUsers.filter((user) => user.is_member), -> check offline first, if not check online, if not check everybody
// isMember: (props) => props.currentUsers.filter((user) => user.is_member), // -> [...50]
// (?)checkGender: (props) => props.currentUsers.filter((user) => user.is_member), -> [...20]
// (?)checkRequest: (props) => props.currentUsers.filter((user) => user.is_member), -> null
// justTest: (props) => props.currentUsers, // -> [...50]https://codesandbox.io/s/hungry-shockley-jv7hy8?file=/src/index.mjs
// alreadyMet: (props) =>
//   props.currentUsers.filter((targetUser) => {
//     return props.oldPairs.some(
//       (oldPair) =>
//         oldPair.includes(<string>targetUser.telegram) &&
//         oldPair.includes(<string>props.user.telegram),
//     );
//   }),
// };

// todo/NOTE: "Old pairs" are pairs from previous weeks
// todo/NOTE: "Paired users" are users who have already been paired in this algorithm run
export function findPairs(props: {
  sortedUsers: ExtendedUserType[]
  oldPairs: CleanPairType[]
}) {
  const { sortedUsers, oldPairs } = props
  const pairedUsers: string[] = []
  const pairs: BestPairType[] = []
  sortedUsers.forEach(user => {
    // Don't start matching for users who have already been paired in this algorithm run
    if (user.telegram && pairedUsers.includes(user.telegram)) return
    const pair = findPair({
      user,
      sortedUsers,
      pairedUsers,
      oldPairs,
      // filters,
    })
    if (pair) pairs.push(pair)
  })
  return pairs
}
