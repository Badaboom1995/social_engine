'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/signup')
  }, [])
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-10'>
      <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'></div>
    </main>
  )
}
