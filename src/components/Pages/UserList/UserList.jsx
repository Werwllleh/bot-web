import React, {useEffect, useState} from 'react';
import {getUsersData} from "../../../utils/usersUtils";
import {Watermark, Button, Modal} from "antd";
import Header from "../../Header/Header";
import {FormOutlined} from '@ant-design/icons';

const UserList = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalInput, setModalInput] = useState('');
  const [users, setUsers] = useState([]);


  useEffect(() => {
    getUsersData()
      .then(res => setUsers(res.data))
  }, []);


  const showModal = (columnName, value) => {
    setIsModalOpen(true);
    setModalData({
      column: columnName,
      value: value
    })
  };
  const handleSave = () => {
    setIsModalOpen(false);
    setModalData({});
    setModalInput('');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalData({})
    setModalInput('');
  };
  const modalInputChange = (e) => {
    setModalInput(e.target.value)
  }

  // console.log(users)
  // console.log(modalData)

  return (
    <>
      <div className="container">
        <div className="admin-users">
          <div className="admin-page__bg">
            <Watermark content="vagcheb"/>
          </div>
          <Header title={"Пользователи"}/>
          <ul className="admin-users__list">
            {
              users.map((user) => {
                return (
                  <li key={user.id} className="admin-users__item admin-user-item">
                    <div className="admin-user-item__body">
                      {Object.entries(user).map((data, index) => {
                        return (
                          <div key={index} className="admin-user-item__row">
                            <div className="admin-user-item__key">{data[0]}</div>
                            <div style={data[1] !== '' ? { marginRight: '15px' } : {}} className="admin-user-item__value">{data[1]}</div>
                            {data[0] !== 'chatId' && data[0] !== 'id' && <div onClick={() => showModal(data[0], data[1])} className="admin-user-item__edit"><FormOutlined /></div>}
                          </div>
                        )
                      })}
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <Modal title={`Столбец - ${modalData.column}`} wrapClassName={'admin-users__modal'} destroyOnClose={true} centered={true} open={isModalOpen} onOk={handleSave} okText={'Сохранить'} onCancel={handleCancel} cancelText={'Отмена'}>
        <div className="admin-users__modal-current-value">Текущее значение: {modalData.value}</div>
        <div className="admin-users__modal-new-value">
          <span>Новое значение:</span>
          <div className="admin-users__modal-new-value-input">
            <input name="input-new-value" type="text" onChange={modalInputChange} value={modalInput}/>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserList;
