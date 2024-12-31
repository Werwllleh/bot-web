import {FileImageOutlined} from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { API_BASE } from "../utils/consts";
import {deleteCarImage} from "../api/api-cars";

const UploadForm = ({ images, maxCount, disabled, actionData }) => {
  const [formImages, setFormImages] = useState([]);

  // Передаем список изображений родительскому компоненту
  useEffect(() => {
    images(formImages);
  }, [formImages]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("Только изображения в формате JPG или PNG!");
      return Upload.LIST_IGNORE;
    }

    if (formImages.length >= maxCount) {
      message.error(`Можно загрузить не более ${maxCount} изображений.`);
      return Upload.LIST_IGNORE;
    }

    message.success("Изображение добавлено.");
    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setFormImages((prev) => {
        const newImages = [...prev, info.file.response];
        if (newImages.length > maxCount) {
          message.error(`Достигнут лимит в ${maxCount} изображения.`);
          return prev; // Игнорируем добавление лишнего изображения
        }
        return newImages;
      });
    }
  };

  const handleRemove = async (file) => {
    try {
      const response = await deleteCarImage(file.response);
      if (response.status === 200) {
        setFormImages((prev) => prev.filter((name) => name !== file.response));
        message.success("Изображение удалено.");
      } else {
        throw new Error("Ошибка при удалении файла на сервере.");
      }
    } catch (error) {
      message.error("Ошибка при удалении изображения.");
    }
  };


  return (
    <Upload
      name="avatar"
      action={`${API_BASE}/upload`}
      data={actionData ? actionData : ''}
      listType="picture"
      multiple
      maxCount={maxCount}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onRemove={handleRemove}
    >
      <input className="upload_input" name="images" type="text" defaultValue={formImages} required={true}/>
      <Button disabled={formImages.length >= maxCount || disabled} icon={<FileImageOutlined />}>
        Загрузить фото автомобиля*
      </Button>
      <span className="upload_note">Загрузите до 4 фотографий авто</span>
    </Upload>
  );
};

export default UploadForm;
