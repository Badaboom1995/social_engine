import React from 'react'
import { useFormContext } from 'react-hook-form'
import TextFieldInput from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import Image from 'next/image'

type TextFieldProps = {
  label?: string
  name: string
  required?: boolean
  iconsSrc?: string
  info?: string | React.ReactNode
  shrink?: boolean
  disabled?: boolean
  min?: { value: number; message: string }
  max?: { value: number; message: string }
  minLength?: { value: number; message: string }
  maxLength?: { value: number; message: string }
  pattern?: { value: RegExp; message: string }
  className?: string
  rows?: number
}

const TextField = (props: TextFieldProps) => {
  const { label, name, required, iconsSrc, info, shrink, disabled } = props
  const { min, max, minLength, maxLength, pattern } = props
  const { formState, register } = useFormContext()
  const { errors } = formState
  const error: any = errors[name]?.message

  return (
    <TextFieldInput
      disabled={disabled}
      rows={props.rows}
      multiline={props.rows ? true : false}
      className={props.className}
      fullWidth
      InputProps={{
        sx: { borderRadius: '8px', border: 'none', background: '#fff' },
        startAdornment: iconsSrc && (
          <InputAdornment position='start'>
            <Image src={iconsSrc} alt='currency' width={15} height={15} />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink,
      }}
      label={label || ''}
      error={!!errors[name]}
      helperText={info || error}
      {...register(name, {
        required,
        min,
        max,
        minLength,
        maxLength,
        pattern,
      })}
    />
  )
}

export default TextField
