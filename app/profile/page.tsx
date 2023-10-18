import React from 'react'
import Image from 'next/image'
import { skillsDict, hobbiesDict } from '@/consts'
import { getGroupsHashtags, getNames } from '@/utils/strings'
import { userService } from '@/services/user'
import AlreadyMetButton from '@/components/AlreadyMetButton'

const Tag = ({ children }: { children: React.ReactNode }) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'indigo']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const colorClass = `bg-${randomColor}-100 text-${randomColor}-800`

  return (
    <span
      className={`${colorClass} rounded-lg py-1 px-2 text-sm border border-slate-300`}
    >
      {children}
    </span>
  )
}

const Page = async ({ searchParams }: any) => {
  const res = await userService.get(searchParams.chatID)
  const user = res?.data

  return (
    <div className='max-w-[600px] m-auto p-5 pb-14'>
      <div className='flex gap-4 mb-6'>
        <div className='w-[120px] h-[120px] overflow-hidden rounded-xl'>
          <Image
            width={100}
            height={100}
            alt='avatar'
            src={user?.profile_photo_url}
            className='w-full'
          />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-xl mb-1'>{user?.name}</h1>
          <p className='text-slate-400 text-sm mb-2 grow'>
            {getGroupsHashtags(user?.groups)}
          </p>
          <a
            className='bg-slate-800 text-white text-center rounded p-1'
            href={`https://t.me/${user?.telegram}`}
          >
            Написать
          </a>
          {/*<p className=''>Чангу (Семеньяк)</p>*/}
        </div>
      </div>
      <p className='border border-slate-500 rounded-xl p-4 pl-10 -ml-10 mb-4 text-md'>
        {user?.description}
      </p>
      <h2 className='text-2xl font-medium mb-2'>Суперсила</h2>
      <p className='text-md mb-4'>{user?.superpower}</p>
      <h2 className='text-2xl font-medium mb-2'>Запрос</h2>
      <p className='text-md mb-4'>{user?.requests}</p>
      <h2 className='text-2xl font-medium mb-4'>Навыки</h2>
      <div className='flex flex-wrap gap-3 mb-4'>
        {getNames(user?.skills, skillsDict)?.map((item: any) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
      <h2 className='text-xl font-medium mb-4'>Хобби</h2>
      <div className='flex flex-wrap gap-3 mb-2'>
        {getNames(user?.hobbies, hobbiesDict)?.map((item: any) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
      <div></div>
      <AlreadyMetButton />
    </div>
  )
}

export default Page
