import React, {useEffect, useState} from 'react';
import {getUsersData, postUserDelete, postUsersUpdatedData} from "../../../utils/usersUtils";
import {Watermark, Modal, Image} from "antd";
import Header from "../../Header/Header";
import {FormOutlined, DeleteOutlined} from '@ant-design/icons';
import {SITE} from "../../../utils/consts";
import {useUsersStore} from "../../../services/store";

const UserList = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalInput, setModalInput] = useState('');
  const [users, setUsers] = useState([]);


  const updateUsers = useUsersStore((state) => state.updateUsers);


  useEffect(() => {
    getUsersData()
      .then(res => setUsers(res.data))
  }, []);


  const showModal = (chatId, columnName, value) => {
    setIsModalOpen(true);
    setModalData({
      chatId: chatId,
      column: columnName,
      value: value
    })
  };
  const handleSave = (chatId, column, value) => {
    postUsersUpdatedData(chatId, column, value)
      .then(res => console.log(res))
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

  const deleteUser = (userId) => {

    postUserDelete(userId)
      .then(res => {
        if (res.status === 200) {
          getUsersData()
            .then((res) => {
              setUsers(res.data);
              return updateUsers(res.data)
            })
        }
      })
  }

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
                      <div className="admin-user-item__info">
                        <div onClick={() => deleteUser(user.id)} className="admin-user-item__delete">
                          <DeleteOutlined />
                        </div>
                        {Object.entries(user).map((data, index) => {
                          return (
                            <div key={index} className="admin-user-item__row">
                              <div className="admin-user-item__key">{data[0]}</div>
                              <div style={data[1] !== '' ? {marginRight: '15px'} : {}}
                                   className="admin-user-item__value">{data[1]}</div>
                              {data[0] !== 'chatId' && data[0] !== 'id' &&
                                <div onClick={() => showModal(Number(user.chatId), data[0], data[1])}
                                     className="admin-user-item__edit"><FormOutlined/></div>}
                            </div>
                          )
                        })}
                      </div>
                      <div className="admin-user-item__image">
                        {/*<img src={`${SITE}api/image/small/${user.carImage}_small.jpeg`} alt=""/>*/}
                        <Image
                          preview={{
                            src: SITE + "api/image/" + user.carImage,
                            mask: 'Просмотр',
                            toolbarRender: () => null,
                          }}
                          loading="lazy"
                          key={user.chatId}
                          onError={(e) => {
                            e.target.src = `${SITE}api/icons/not_found.png`
                          }}
                          src={`${SITE}api/image/small/${user.carImage}_small.jpeg`}
                          alt={`${user.carbrand} ${user.carModel}`}
                        />
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <Modal title={`Столбец - ${modalData.column}`} wrapClassName={'admin-users__modal'} destroyOnClose={true}
             centered={true} open={isModalOpen} onOk={() => handleSave(modalData.chatId, modalData.column, modalInput)}
             okText={'Сохранить'} onCancel={handleCancel} cancelText={'Отмена'}>
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
