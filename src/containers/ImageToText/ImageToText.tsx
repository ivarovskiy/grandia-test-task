import React from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload/interface'
import { postData } from '../../api/api'

import style from './ImageToText.module.scss'

interface Props {
  updateImageInfo: (imageInfo: string) => void
}

const ImageToText: React.FC<Props> = ({ updateImageInfo }) => {
  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options

    // Проверка формата файла
    if (!validateFileFormat(file)) {
      onError('Incorrect file format. Please select an image.')
      return
    }

    try {
      const data = await postData(file);
      onSuccess()
      const imageText = jsonFilter(data);
      updateImageInfo(imageText)
    } catch (error) {
      onError('An error occurred while processing the image.')
    }
  }

  const validateFileFormat = (file: RcFile) => {
    const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif']
    return acceptedFormats.includes(file.type)
  }

  const beforeUpload = (file: RcFile) => {
    if (!validateFileFormat(file)) {
      message.error('Incorrect file format. Please select an image.')
      return Upload.LIST_IGNORE
    }
    return true
  }

  const jsonFilter = (data: any) => {
    let textResult = '';

    for (const item of data) {
      textResult += item.text + ' '
    }

    return textResult;
  }

  return (
    <div className={style.uploadContainer}>
      <h1 className={style.uploadTitle}>Завантаження зображення і обробка</h1>
      <Upload
        listType='picture'
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        maxCount={1}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
      >
        <Button icon={<UploadOutlined />} className={style.uploadButton}>
          Upload
        </Button>
      </Upload>
    </div>
  )
}

export default ImageToText
