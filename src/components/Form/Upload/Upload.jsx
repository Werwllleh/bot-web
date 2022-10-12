import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.min.css';

const props = {
  name: 'file',
  action: 'https://localhost/upload',
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UploadForm = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Загрузить фото</Button>
  </Upload>
);

export default UploadForm;