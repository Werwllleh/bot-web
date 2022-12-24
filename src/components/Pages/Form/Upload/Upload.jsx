import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, message, Upload } from "antd";
import React from "react";
import axios from "axios";

const UploadForm = ({ img }) => {
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    console.log(file);
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/.heic" ||
      file.type === "image/.heif";

    if (!isJpgOrPng) {
      message.error("Только изображение!");
    } else {
      message.success("Изображение загружено");
    }

    const isLt5M = file.size / 1024 / 1024 < 15;

    if (!isLt5M) {
      message.error("Изображение должно весить не больше 15 МБ");
    }

    return isJpgOrPng && isLt5M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {});
      img(info.file.response);
    }
  };

  const handleRemove = (file) => {
    let response = file.response;
    axios.post("https://92.255.78.177/api/upload/remove", {
      response,
    });
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Upload
        name="avatar"
        action="https://92.255.78.177/api/upload"
        listType="picture"
        maxCount={1}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        <Button icon={<UploadOutlined />}>Загрузить фото автомобиля</Button>
      </Upload>
    </Space>
  );
};

export default UploadForm;
