'use client'
import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { CheckboxGroup } from '@/components/Checkbox'
import useUser from '@/utils/hooks/useUser'
import { ToastContainer, toast } from 'react-toastify'
import Success from './success'
import { getLastRequest } from '@/utils/getLastRequest'
import { request } from '@/services/request'
import 'react-toastify/dist/ReactToastify.css'

const locations = [
  { label: 'Чангу/Семеньяк', value: 'Чангу/Семеньяк' },
  { label: 'Убуд', value: 'Убуд' },
  { label: 'Букит', value: 'Букит' },
]
const format = [
  { label: 'Офлайн', value: 'Офлайн' },
  { label: 'Онлайн', value: 'Онлайн' },
]

const funprofit = [
  { label: '100/0', value: '0' },
  { label: '75/25', value: '25' },
  { label: '50/50', value: '50' },
  { label: '25/75', value: '75' },
  { label: '0/100', value: '100' },
]

const RequestForm = () => {
  const methods = useForm()
  const user = useUser()
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const choosedFormat = methods.watch('format')

  const onSubmit: any = async (data: any) => {
    if (!data.format || !data.profit_level) {
      toast.error('Заполните все поля')
      return
    }
    if (data.format == 'Офлайн' && !data.location) {
      toast.error('Выберите локацию')
      return
    }
    const normalizeFormData: any = {
      format: data.format[0],
      profit_level: data.profit_level[0],
    }
    if (data.location) {
      normalizeFormData.location = data.location[0]
    }
    setLoading(true)
    const res = await getLastRequest(user?.username)
    if (res.error) {
      console.log('not found')
      await request.create({
        telegram: user.username,
        profit_level: parseInt(normalizeFormData.profit_level),
        ...normalizeFormData,
      })
    } else {
      // TODO: check if last request from this week
      const requestData = { ...res.data, ...normalizeFormData }
      await request.update({
        ...requestData,
        location: requestData.format === 'Онлайн' ? null : requestData.location,
        profit_level: parseInt(requestData.profit_level),
      })
    }
    setLoading(false)
    setSuccess(true)
  }

  if (isSuccess) return <Success />
  return (
    <div className='p-4'>
      <p className='mb-8 text-[24px]'>Заполните запрос</p>
      <ToastContainer />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-col gap-4 items-start'
        >
          <div className='grow'>
            <CheckboxGroup
              options={funprofit}
              groupName='profit_level'
              groupLabel={
                <div>
                  <p className='mb-2'>1. Фан/Польза</p>
                  <div className='bg-slate-100 p-2 rounded text-sm'>
                    Некоторые люди приходят на встречи, чтобы найти партнёров
                    для будущих проектов и завести полезные контакты, условно
                    назовём это пользой. А кто-то приходит для расширения
                    кругозора, новых эмоций и открытия чего-то нового, назовём
                    это фан. <br />
                    <br />
                    Какое соотношение больше подходит тебе?
                  </div>
                </div>
              }
              max={1}
            />
            <CheckboxGroup
              options={format}
              groupName='format'
              groupLabel={`2. Как ты хочешь встречаться с участниками - онлайн или офлайн на Бали?`}
              max={1}
            />
            {choosedFormat && choosedFormat[0] === 'Офлайн' && (
              <CheckboxGroup
                options={locations}
                groupName='location'
                groupLabel={'3. Где хочешь встречаться?'}
                max={1}
              />
            )}
          </div>
          <button
            className='fixed bottom-0 left-0 w-full p-2 bg-gradient-to-r from-green-500 to-cyan-500 text-center text-white'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Готово'}
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default RequestForm
