'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const AlreadyMetButton = () => {
  const [tgUser, setTgUser] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(true)
  const params = useSearchParams()

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    // @ts-ignore
    setTgUser(window?.Telegram?.WebApp?.initDataUnsafe?.user)
    // @ts-ignore
    console.log(window?.Telegram?.WebApp?.initDataUnsafe?.user)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 flex justify-center p-2 w-full text-center gap-2 ${
        isOpen ? 'visible' : 'hidden'
      }`}
    >
      <button className='p-2 px-4 w-1/2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded shadow'>
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
