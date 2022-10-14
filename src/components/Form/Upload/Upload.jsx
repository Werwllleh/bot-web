/* import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.min.css';

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
    message.error('Изображение загружено');
  }

  return isJpgOrPng;
};

const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {

    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);

    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className={'upload-text'}>
        Загрузить фото
      </div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      multiple={false}
      maxCount={1}
      action="https://193.164.149.140/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadForm; */

import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, message, Upload } from 'antd';
import React, { useState } from 'react';
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

    return isJpgOrPng;
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

    if (info.file.status === 'removed') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
      });
      console.log('delete');
    }

    console.log(info);
  };

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
    >
      <Button icon={<UploadOutlined />}>Загрузить фото</Button>
    </Upload>
  </Space>
)
}

export default UploadForm;