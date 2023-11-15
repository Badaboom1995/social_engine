import React from 'react'
import Image from 'next/image'

const Success = () => {
  return (
    <div className='p-4 py-8 text-md text-center'>
      <p className=' text-xl mb-4'>Получилось! 🙌</p>
      <p className='mb-8 w-full'>
        Теперь ты — участник встреч <br />
        minders community ☕️
      </p>
      <p className='block'>Присоединяйся к нашим соц.сетям:</p>
      <a className='block underline' href='https://t.me/minders_channel'>
        💙 t.me/minders_channel
      </a>
      <a
        href='https://instagram.com/minders.community'
        className='block mb-4 underline'
      >
        📸 instagram.com/minders.community
      </a>
      <p className='mb-4'>
        В понедельник мы пришлем подобранного специально для тебя участника.
      </p>
      <p className='mb-4'> Хороших встреч! ☕️</p>
      <Image
        src='https://res.cloudinary.com/dgpgmk0w7/image/upload/v1688229482/static/beforeMeenting_oalwna.png'
        alt='before meeting'
        width={390}
        height={686}
      />
      <button
        onClick={() => {
          // @ts-ignore
          window.Telegram.WebApp.close()
        }}
        className='fixed bottom-0 left-0 w-full bg-gradient-to-r from-green-500 to-cyan-500 text-center text-white p-2 px-4'
      >
        Закрыть
      </button>
    </div>
  )
}

export default Success
