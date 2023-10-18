import { PairType } from '../model'
import { supabase } from '@/supabase'
import { CleanPairType } from '@/types'

export const getPairs = async (): Promise<CleanPairType[]> => {
  const { data, error } = await supabase.from('Pairs').select('*')
  if (error) {
    throw new Error(error.message)
  }
  const cleanData = data.map(
    (pair: PairType): CleanPairType => [pair.user || '', pair.partner || ''],
  )
  return cleanData
}
