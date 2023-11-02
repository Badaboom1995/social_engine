'use client'
import React, { useEffect, useState } from 'react'
import TextField from '@/components/TextField/TextField'
import { useForm, FormProvider } from 'react-hook-form'
import { CheckboxGroup } from '@/components/Checkbox'
import FileUpload from '@/components/FileUpload/FileUpload'
import { skillsDict, hobbiesDict } from '@/consts'
import { supabase } from '@/supabase'
import useUser from '@/utils/hooks/useUser'
import { getUserFormDB } from '@/utils/getUserFromDB'
import { getUrl } from '@/utils/getUrl'
import { v4 as uuid } from 'uuid'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Success from './success'

const options = [
  { label: 'Инвестор', value: 'Я инвестор' },
  { label: 'Основатель', value: 'Я основатель' },
  { label: 'Специалист', value: 'Я специалист' },
  { label: 'Творческая личность', value: 'Я творческая личность' },
]
const Title = ({ children }: any) => <p className=' text-[16px]'>{children}</p>
const Signup = () => {
  const methods = useForm()
  const user = useUser()
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  useEffect(() => {
    if (!user) return
    getUserFormDB(user?.id).then(res => {
      if (res.user) {
        const defaultValues = {
          ...res.user,
          groups: res.user.groups.split(','),
          skills: res.user.skills.split(','),
          hobbies: res.user.hobbies.split(','),
        }
        methods.reset(defaultValues)
      } else {
        toast.error('Вы не авторизованы, пожалуйста введите /start в боте')
      }
    })
  }, [user])

  const onSubmit: any = async (data: any) => {
    setLoading(true)
    let photo = data.profile_photo_url
    if (typeof data.profile_photo_url === 'object') {
      const path = await supabase.storage
        .from('avatars')
        .upload(`${uuid()}.png`, data.profile_photo_url?.[0], { upsert: true })
      const res = supabase.storage
        .from('avatars')
        .getPublicUrl(path.data?.path || '')

      photo = res.data.publicUrl
    }

    await supabase
      .from('Users')
      .update({
        ...data,
        profile_photo_url: getUrl(photo),
        groups: data.groups.join(','),
        skills: data.skills.join(','),
        hobbies: data.hobbies.join(','),
      })
      .eq('chat_id', user.id)

    setLoading(false)
    setSuccess(true)
  }
  const skills = skillsDict.map(skill => {
    return { label: skill.name, value: skill.id }
  })
  const hobbies = hobbiesDict.map(hobby => {
    return { label: hobby.name, value: hobby.id }
  })
  if (isSuccess) return <Success />
  return (
    <div className='p-4'>
      <p className='mb-8 text-[24px]'>Заполни анкету</p>
      <ToastContainer />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-col gap-4 items-start'
        >
          <Title>1. Как тебя зовут?</Title>
          <TextField name='name' />
          <FileUpload name='profile_photo_url' label='Загрузите фото профиля' />
          <CheckboxGroup
            options={options}
            groupName='groups'
            groupLabel={'2. Выбери группы к которым себя относишь.'}
          />
          <Title>3. Расскажи немного о себе</Title>
          <TextField rows={3} name='description' />
          <Title>
            4. Какие у тебя запросы к сообществу? Что ожидаешь от него получить?
          </Title>
          <TextField rows={3} name='requests' />
          <Title>
            5. Какая у тебя супер сила? Как ты считаешь, в чем тебе нет равных?
          </Title>
          <TextField rows={3} name='superpower' />
          <CheckboxGroup
            options={skills}
            groupName='skills'
            groupLabel={
              <span>
                6. Выбери свои основные профессиональные навыки. <br />
                <span className='text-gray-500 text-sm'>
                  Не более 5 вариантов.
                </span>
              </span>
            }
            max={5}
          />
          <CheckboxGroup
            options={hobbies}
            groupName='hobbies'
            groupLabel={
              <span>
                7. Выбери свои увлечения и хобби. <br />
                <span className='text-gray-500 text-sm'>
                  Не более 5 вариантов.
                </span>
              </span>
            }
            max={5}
          />
          <button
            className='w-full p-2 rounded bg-gradient-to-r from-green-500 to-cyan-500 text-center text-white'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Signup
