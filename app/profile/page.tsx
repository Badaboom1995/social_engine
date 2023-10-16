'use client'
import React from 'react'
import Image from 'next/image'
import { getTgData } from '@/utils/setTgData'

const Tag = ({ children }: { children: React.ReactNode }) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'indigo']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const colorClass = `bg-${randomColor}-100 text-${randomColor}-800`

  return (
    <span className={`${colorClass} rounded-lg py-1 px-2 text-sm`}>
      {children}
    </span>
  )
}

const Page = () => {
  const tgData = getTgData()
  return (
    <div className='max-w-[600px] m-auto p-5'>
      <div className='flex gap-4 mb-6'>
        <div className='w-[120px] h-[120px] overflow-hidden rounded-xl'>
          <Image
            width={100}
            height={100}
            alt='avatar'
            src='/profile.jpg'
            className='w-full'
          />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-xl mb-1'>
            Лейла Карташова ({/*@ts-ignore*/}
            {tgData && tgData.user.username})
          </h1>
          <p className='text-slate-400 text-sm mb-2'>
            Основатель в <a className='underline'>CEO.me</a>
          </p>
          <p className=''>Чангу (Семеньяк)</p>
        </div>
      </div>
      <p className='border border-slate-500 rounded-xl p-4 pl-10 -ml-10 mb-4 text-sm'>
        Я являюсь сооснователем мебельного бренда FOLD. Сейчас я занимаюсь
        наверное почти всем кроме HR и Маркетинга) К примеру: поиск и
        налаживание связей с производством/фабрикой, настройка логистики
      </p>
      <h2 className='text-xl font-medium mb-2'>Суперсила</h2>
      <p className='text-sm mb-4'>
        Молода и прекрасна, еще и умная) А вообще, моя суперсила - количество
        прикладных навыков: организую вам вечеринку или мероприятие, выступлю
        спикером или ведущей, спою и сыграю на укулеле, прекрасна в роли модели,
        актрисы, друга и наставника 💌
      </p>
      <h2 className='text-xl font-medium mb-2'>Запрос</h2>
      <p className='text-sm mb-4'>Болтать с интересными людьми</p>
      <h2 className='text-xl font-medium mb-4'>Навыки</h2>
      <div className='flex flex-wrap gap-3 mb-2'>
        <Tag>💪 Спорт</Tag>
        <Tag>💪 Кулинария</Tag>
        <Tag>💪 Музыка</Tag>
        <Tag>💪 Спорт</Tag>
        <Tag>💪 Кулинария</Tag>
        <Tag>💪 Музыка</Tag>
        <Tag>💪 Спорт</Tag>
        <Tag>💪 Кулинария</Tag>
        <Tag>💪 Музыка</Tag>
        <Tag>💪 Спорт</Tag>
        <Tag>💪 Кулинария</Tag>
        <Tag>💪 Музыка</Tag>
      </div>
      <h2 className='text-xl font-medium mb-4'>Хобби</h2>
      <div>
        <Tag>💪 Спорт</Tag>
        <Tag>💪 Кулинария</Tag>
        <Tag>💪 Музыка</Tag>
      </div>
    </div>
  )
}

export default Page
