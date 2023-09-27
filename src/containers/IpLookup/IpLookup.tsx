import React from 'react'
import { Input, Button, Form } from 'antd'
import { FireOutlined, FireFilled } from '@ant-design/icons'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IIpInfo } from '../../models/ip'

import styles from './IpLookup.module.scss'

import { fetchData } from '../../api/api'

const schema = yup.object({
  ipAddress: yup
    .string()
    .matches(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/, 'Ip address is incorrect')
    .required('Ip Address is required'),
})

interface IFormValues {
  ipAddress: string
}

interface Props {
  updateIpInfo: (ipInfo: IIpInfo) => void
}

const buttonOutlined = (
  <FireOutlined
    style={{
      fontSize: 18,
      color: '#9e4118',
    }}
  />
)
const buttonFilled = (
  <FireFilled
    style={{
      fontSize: 18,
      color: '#9e4118',
    }}
  />
)

const IpLookup: React.FC<Props> = ({ updateIpInfo }) => {
  const form = useForm<IFormValues>({
    resolver: yupResolver(schema),
  })

  const { control, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (formData: IFormValues) => {
    const data = await fetchData(formData.ipAddress)
    updateIpInfo(data)
  }

  return (
    <div>
      <h1>Завантаження інформації про IP</h1>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Controller
          name='ipAddress'
          control={control}
          render={({ field }) => (
            <Form.Item help={errors.ipAddress?.message} validateStatus={errors.ipAddress && 'error'}>
              <Input
                {...field}
                status={errors.ipAddress ? 'error' : ''}
                suffix={
                  <Button
                    ghost
                    type='text'
                    size='large'
                    icon={errors.ipAddress ? buttonOutlined : buttonFilled}
                    htmlType='submit'
                  >
                    Submit
                  </Button>
                }
                placeholder='xxx.xxx.xxx.xxx'
              />{' '}
            </Form.Item>
          )}
        />
      </Form>
    </div>
  )
}

export default IpLookup
