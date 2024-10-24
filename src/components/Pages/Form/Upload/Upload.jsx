import {FileImageOutlined} from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { API_BASE } from "../../../../utils/consts";

const UploadForm = ({ data }) => {
  const [images, setImages] = useState([]);

  // Передаем список изображений родительскому компоненту
  useEffect(() => {
    data(images);
  }, [images]);

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("Только изображения в формате JPG или PNG!");
      return Upload.LIST_IGNORE;
    }

    if (images.length >= 3) {
      message.error("Можно загрузить не более 3 изображений.");
      return Upload.LIST_IGNORE;
    }

    message.success("Изображение добавлено.");
    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setImages((prev) => {
        const newImages = [...prev, info.file.response];
        if (newImages.length > 3) {
          message.error("Достигнут лимит в 3 изображения.");
          return prev; // Игнорируем добавление лишнего изображения
        }
        return newImages;
      });
    }
  };

  const handleRemove = async (file) => {
    try {
      const res = await axios.post(`${API_BASE}/upload/remove`, {
        fileName: file.response,
      });

      if (res.data.status === "delete") {
        setImages((prev) => prev.filter((name) => name !== file.response));
        message.success("Изображение удалено.");
      }
    } catch (error) {
      message.error("Ошибка при удалении изображения.");
    }
  };

  return (
    <Upload
      name="avatar"
      action={`${API_BASE}/upload`}
      listType="picture"
      multiple
      maxCount={3}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onRemove={handleRemove}
    >
      <Button icon={<FileImageOutlined />}>Загрузить фото автомобиля*</Button>
    </Upload>
  );
};

export default UploadForm;
