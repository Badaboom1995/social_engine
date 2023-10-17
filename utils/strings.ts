export const getGroupsHashtags = (groups: any) =>
  groups
    ?.split(',')
    .map((group: any) => `#${group.trim().split(' ').slice(1).join('')}`)
    .join(' ')

export const getNames = (str: string, dict: Record<string, any>) => {
  return str
    ?.split(',')
    .map(item => dict.find((dictItem: any) => dictItem.id === item)?.name)
}
