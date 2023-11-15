import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

type CheckboxGroupProps = {
  options: { label: string; value: string }[]
  groupName: string
  groupLabel: string | React.ReactNode
  max?: number
}

const CheckboxGroup = ({
  options,
  groupName,
  groupLabel,
  max,
}: CheckboxGroupProps) => {
  const { setValue, watch, register } = useFormContext()
  const groupValue = watch(groupName)
  const toggleTag = (value: string) => {
    if (groupValue && groupValue?.includes(value)) {
      setValue(groupName, groupValue?.filter((item: string) => item !== value))
    } else {
      if (max === 1) {
        setValue(groupName, [value])
      }
      if (max && groupValue?.length >= max) return
      setValue(groupName, [...groupValue, value])
    }
  }

  useEffect(() => {
    register(groupName)
    setValue(groupName, [])
  }, [])

  return (
    <div className='flex flex-wrap gap-2 py-2'>
      <p className='w-full text-[16px] font-normal mb-2'>{groupLabel}</p>
      {options.map(option => (
        <button
          key={option.value}
          className={`rounded-lg py-2 px-3 text-sm border border-slate-300 ${
            groupValue?.includes(option.value) && `bg-lime-100`
          }`}
          type='button'
          onClick={() => toggleTag(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default CheckboxGroup
