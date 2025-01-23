import React, {useEffect, useState} from 'react';
import {API_BASE} from "../utils/consts";
import {DeleteFilled, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {Form, Input, message, notification, Select, Upload} from "antd";
import {changeCarData, deleteCarImage, getCars} from "../api/api-cars";
import {getUserInfo} from "../api/api-users";
import {validateCarNumber} from "../utils/patterns";
import dayjs from "dayjs";
import {useUsersStore} from "../services/store";
import {checkObject} from "../utils/checkObject";

const ProfileEditForm = ({selectedCar, updateSelectedCar}) => {

  const [api, contextHolder] = notification.useNotification();
  const showNotification = (type, message, description) => {
    if (type === 'success') {
      api[type]({
        message: message,
        description: description
      });
    }
    if (type === 'error') {
      api[type]({
        message: message,
        description: description
      });
    }
  };

  const [loading, setLoading] = useState(false);

  const [cars, setCars] = useState({});

  useEffect(() => {
    getCars().then(res => {
      setCars(res.data)
    })
  }, []);

  /*useEffect(() => {
    console.log(selectedCar)
  }, [selectedCar])*/


  const userTelegramData = useUsersStore((state) => state.userTelegramData);

  const userData = useUsersStore((state) => state.userData);
  const updateUserData = useUsersStore((state) => state.updateUserData);
  const updateUsersCars = useUsersStore((state) => state.updateUsersCars);

  const deleteProfileCarImage = async (image, data) => {
    await deleteCarImage(image, data);
    await getUserInfo(userTelegramData?.id).then(res => {
      if (res.data !== '') {
        updateUserData(res.data);
        updateSelectedCar(res.data?.cars.filter(car => car.car_id === data.car_id)[0]);
        updateUsersCars();
      }
    })

  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("Только изображения в формате JPG или PNG!");
      return Upload.LIST_IGNORE;
    }

    message.success("Изображение добавлено.");
    return true;
  };

  const handleChange = async (info, car_id) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      await getUserInfo(userTelegramData?.id).then(res => {
        if (res.data !== '') {
          updateUserData(res.data);
          updateSelectedCar(res.data.cars.filter(car => car.car_id === car_id)[0]);
          updateUsersCars();
        }
      })
    }
  };

  const [form] = Form.useForm();

  const selectedBrand = Form.useWatch('carBrand', form);
  const selectedModel = Form.useWatch('carModel', form);


  useEffect(() => {

    if (selectedBrand && checkObject(cars)) {

      const selectedBrandModels = cars?.models[selectedBrand?.toUpperCase()];

      if (selectedModel) {
        const findBrandModel = selectedBrandModels.find(model => model.value === selectedModel);

        if (findBrandModel === undefined) {
          form.setFieldsValue({ carModel: undefined });
        }
      }

    }

  }, [form, cars, selectedBrand, selectedModel]);

  const handleSubmit = async (values) => {
    try {
      // console.log(values)

      if (!validateCarNumber.test(values.carNumber)) {
        return showNotification('error', 'Номер введен не корректно')
      }

      if (Number(values.carYear) < 1800 || Number(values.carYear) > dayjs().year()) {
        return showNotification('error', 'Год введен не корректно')
      }

      if (values.carDrive2 !== '' && !values.carDrive2.includes('www.drive2.ru')) {
        return showNotification('error', 'Ссылка должна быть с Drive2')
      }

      await changeCarData(userData.chat_id, selectedCar?.car_id, values)
        .then(res => {
          if (res.status === 200) {
            getUserInfo(userTelegramData?.id).then(res => {
              if (res.data !== '') {
                updateUserData(res.data);
                updateSelectedCar(res.data.cars.filter(car => car.car_id === selectedCar?.car_id)[0]);
                updateUsersCars();
              }
            })
            return showNotification('success', res.data)
          }
          if (res.status === 203) {
            return showNotification('error', res.data)
          }
        })
        .catch(err => {
          console.error(err)
        })
    } catch (error) {
      message.error(error.message || 'Ошибка отправки данных.');
    }
  };

  const uploadButton = (
    <button type="button" className="modal-info__upload-button">
      <div className="modal-info__upload-button-icon">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
      </div>
      <div className="modal-info__upload-button-text">
        Добавить фото
      </div>
    </button>
  );

  return (
    <>
      {contextHolder}
      <div className="page-profile__modal-info modal-info">
        {selectedCar.car_images.length > 0 && (
          <div className="modal-info__images">
            {selectedCar.car_images.map((image) => {
              return (
                <div key={image} className="modal-info__image">
                  <div className="modal-info__image-img">
                    <img src={`${API_BASE}/car/${image}`} alt=""/>
                  </div>
                  {selectedCar.car_images.length > 1 && (
                    <div onClick={() => deleteProfileCarImage(image, {
                      chat_id: userData?.chat_id,
                      car_id: selectedCar?.car_id
                    })} className="modal-info__image-action"><DeleteFilled/></div>
                  )}
                </div>
              )
            })}
            {selectedCar.car_images.length >= 1 && selectedCar.car_images.length < 4 && (
              <div className="modal-info__upload">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={`${API_BASE}/upload`}
                  data={
                    {
                      chat_id: userData?.chat_id,
                      car_id: selectedCar?.car_id,
                      downloadType: 'non-stop'
                    }
                  }
                  // multiple
                  maxCount={1}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, selectedCar?.car_id)}
                >
                  {uploadButton}
                </Upload>
              </div>
            )}
          </div>
        )}
        <div className="modal-info__car">
          <Form form={form} onFinish={handleSubmit} initialValues={{
            carBrand: selectedCar?.car_brand,
            carModel: selectedCar?.car_model,
            carNumber: selectedCar?.car_number,
            carYear: selectedCar?.car_year,
            carNote: selectedCar?.car_note,
            carDrive2: selectedCar?.car_drive2,
          }} variant="borderless" className="modal-info__car-form" layout="vertical">
            <div className="select-antd">
              <Form.Item
                name="carBrand"
                rules={[
                  {
                    required: true,
                    message: 'Укажи бренд!',
                  },
                ]}
              >
                <Select options={cars.brands}/>
              </Form.Item>
            </div>
            {selectedBrand !== undefined && cars.models && (
              <div className="select-antd">
                <Form.Item
                  name="carModel"
                  rules={[
                    {
                      required: true,
                      message: 'Укажи модель!',
                    },
                  ]}
                >
                  <Select options={cars.models[selectedBrand?.toUpperCase()]}/>
                </Form.Item>
              </div>
            )}
            <div className="input-antd">
              <Form.Item
                name="carNumber"
                rules={[
                  {
                    required: true,
                    message: 'Укажи номер!',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </div>
            <div className="input-antd">
              <Form.Item
                name="carYear"
                rules={[
                  {
                    required: true,
                    message: 'Укажи год выпуска!',
                  },
                ]}
              >
                <Input type="tel" placeholder="Год выпуска авто"/>
              </Form.Item>
            </div>
            <div className="input-antd">
              <Form.Item name="carDrive2">
                <Input placeholder="Ссылка на Drive2"/>
              </Form.Item>
            </div>
            <div className="input-antd">
              <Form.Item name="carNote">
                <Input placeholder="Примечание"/>
              </Form.Item>
            </div>
            <div className="modal-info__car-submit">
              <button className="style-btn" type="submit">
                Обновить данные
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProfileEditForm;
