export const getUrl = (field: any) => {
  if (typeof field === 'string') return field
  if (field?.[0]) return URL?.createObjectURL(field?.[0])
  return undefined
}
