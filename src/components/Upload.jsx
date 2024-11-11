import {FileImageOutlined} from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { API_BASE } from "../utils/consts";
import {deleteCarImage} from "../api/api-cars";

const UploadForm = ({ index, data, maxCount, disabled }) => {
  const [images, setImages] = useState([]);

  // Передаем список изображений родительскому компоненту
  useEffect(() => {
    data(images);
  }, [images]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("Только изображения в формате JPG или PNG!");
      return Upload.LIST_IGNORE;
    }

    if (images.length >= maxCount) {
      message.error(`Можно загрузить не более ${maxCount} изображений.`);
      return Upload.LIST_IGNORE;
    }

    message.success("Изображение добавлено.");
    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setImages((prev) => {
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
        setImages((prev) => prev.filter((name) => name !== file.response));
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
      name={`avatar${index}`}
      action={`${API_BASE}/upload`}
      listType="picture"
      multiple
      maxCount={maxCount}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onRemove={handleRemove}
    >
      <input className={"upload_input"} name={`images${index}`} type="text" defaultValue={images} required={true}/>
      <Button disabled={images.length >= maxCount || disabled} icon={<FileImageOutlined />}>Загрузить фото автомобиля*</Button>
    </Upload>
  );
};

export default UploadForm;
