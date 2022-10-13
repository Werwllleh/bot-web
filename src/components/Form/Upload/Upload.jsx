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
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/heic' || file.type === 'image/heif';

  if (!isJpgOrPng) {
    message.error('Только формат изображения!');
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
import { Button, Upload } from 'antd';
import 'antd/dist/antd.min.css';
import React from 'react';

const UploadForm = () => (
  <>
    <Upload
      action="https://193.164.149.140/api/upload"
      listType="picture"
      multiple={false}
      maxCount={1}
      /* defaultFileList={[...fileList]} */
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  </>
);
export default UploadForm;