import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, message, Upload } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';


const UploadForm = () => {

  const [loading, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/heic' || file.type === 'image/heif';

    if (!isJpgOrPng) {
      message.error('Только изображение!');
    } else {
      message.success('Изображение загружено');
    }

    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isLt5M) {
      message.error('Изображение должно весить не больше 5 МБ');
    }

    return isJpgOrPng && isLt5M;
  };

  const handleChange = (info) => {

    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
      });
    }

    // console.log(info);
  };

  const handleRemove = (file) => {
    let response = file.response;
    // console.log(response);
    axios.post('https://193.164.149.140/api/upload/remove', {
      response,
    });
  }

  return (
  <Space
    direction="vertical"
    style={{width: '100%'}}
    size="large"
  >
    <Upload
      name="avatar"
      action="https://193.164.149.140/api/upload"
      listType="picture"
      maxCount={1}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onRemove={handleRemove}
    >
      <Button icon={<UploadOutlined />}>Загрузить фото автомобиля</Button>
    </Upload>
  </Space>
  )
}

export default UploadForm;