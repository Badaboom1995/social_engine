'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/supabase'
import { ExtendedUserType, CleanPairType } from '@/types'
import { getSortedUsers } from '@/matching/getSortedUsers'
import { getInitData } from '@/matching/getInitData'
import { findPair } from '@/matching/findPersonalPair'
import { badavooChatId } from '@/consts'

const AlreadyMetButton = () => {
  const [tgUser, setTgUser] = useState<any>(null)
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const params = useSearchParams()
  const router = useRouter()

  const handleClose = () => {
    setIsOpen(false)
  }

  const alreadyMet = async () => {
    try {
      setLoading(true)
      const initData = await getInitData()
      if (!initData) {
        console.log('No data, should be some error')
        return
      }
      const { users } = initData
      const cleanUsers = users.filter((user: ExtendedUserType) => user.telegram)
      const sortedUsers = getSortedUsers(cleanUsers)

      const user = await supabase
        .from('Users')
        .select('*')
        .eq('chat_id', tgUser?.id)
        .single()

      const partner = await supabase
        .from('Users')
        .select('*')
        .eq('chat_id', params.get('chatID'))
        .single()

      const userRequest = await supabase
        .from('Requests')
        .select('*')
        .eq('telegram', tgUser?.username)
        .limit(1)
        .single()

      const userWithRequest = {
        ...user.data,
        format: userRequest?.data.format,
        profit_level: userRequest?.data.profit_level,
        location: userRequest?.data.location,
      }

      const userPairs = await supabase
        .from('Pairs')
        .select('*')
        .or(
          `user.eq.${userWithRequest?.telegram},partner.eq.${userWithRequest?.telegram}`,
        )
      const cleanPairs: CleanPairType[] =
        userPairs?.data?.map(pair => [pair.user, pair.partner]) || []

      const pair = findPair({
        user: userWithRequest,
        sortedUsers,
        pairedUsers: [partner?.data?.telegram],
        oldPairs: cleanPairs,
      })

      await supabase.from('Pairs').insert([
        {
          user: pair?.user?.telegram,
          partner: pair?.partner?.telegram,
        },
      ])
      router.push(`/profile?chatID=${pair?.partner?.chat_id}`)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    // @ts-ignore
    setTgUser(window?.Telegram?.WebApp?.initDataUnsafe?.user)
    // @ts-ignore
    console.log(window?.Telegram?.WebApp?.initDataUnsafe?.user)
  }, [])
  if (isLoading) {
    return (
      <div className='fixed bottom-0 left-0 flex justify-center p-2 w-full text-center gap-2 bg-slate-800 text-white'>
        Ищем новую пару...
      </div>
    )
  }

  return (
    <div
      className={`fixed bottom-0 left-0 flex justify-center p-2 w-full text-center gap-2 ${
        isOpen ? 'visible' : 'hidden'
      }`}
    >
      <button
        className='p-2 px-4 w-1/2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded shadow'
        onClick={alreadyMet}
      >
        Уже виделись
      </button>
      <button
        className='w-1/2 p-2 px-4 text-white  bg-gradient-to-r from-green-500 to-cyan-500 rounded shadow'
        onClick={handleClose}
      >
        Принять
      </button>
    </div>
  )
}

export default AlreadyMetButton
