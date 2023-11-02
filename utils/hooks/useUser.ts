import React, { useEffect, useState } from 'react'

const useUser = () => {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    // @ts-ignore
    setUser(window.Telegram?.WebApp?.initDataUnsafe?.user)
    // @ts-ignore
    console.log(window.Telegram?.WebApp?.initDataUnsafe?.user)
    // @ts-ignore
  }, [])

  return user
}

export default useUser
