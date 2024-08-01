import React, {useCallback, useEffect, useState} from 'react';
import {getUsersData, postUserDelete, postUsersUpdatedData} from "../../../utils/usersUtils";
import {Watermark, Modal, Image, Input, Empty} from "antd";
import Header from "../../Header/Header";
import {FormOutlined, DeleteOutlined} from '@ant-design/icons';
import {API} from "../../../utils/consts";
import {useUsersStore} from "../../../services/store";
import {debounce} from "lodash";
import Loader from "../../Loader/Loader";

const UserList = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalInput, setModalInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectUserId, setSelectUserId] = useState(null);

  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);


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

  const handleShowDeleteUserModal = (userId) => {
    setDeleteUserModalOpen(true)
    setSelectUserId(userId)
  }

  const handleCancelDeleteUser = () => {
    setDeleteUserModalOpen(false)
    setSelectUserId(null)
  }

  const deleteUser = () => {
    try {
      if (selectUserId) {
        postUserDelete(selectUserId)
          .then(res => {
            if (res.status === 200) {
              handleCancelDeleteUser()
              if (filteredUsers.length && searchInput !== '') {
                const index = filteredUsers.findIndex(user => user.id === selectUserId);
                setFilteredUsers(filteredUsers.splice(index, 1))
              }
              getUsersData()
                .then((res) => {
                  setUsers(res.data);
                  return updateUsers(res.data)
                })
            }
          })
      }
    } catch (e) {
      console.log(e)
    }
  }


  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setSearchInput(value.toUpperCase());
    }, 200), // Задержка в 300 мс
    []
  );

  const changeSearch = (e) => {
    debouncedChangeHandler(e.target.value);
  };

  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      searchInput.length &&
      (user?.carGRZ?.startsWith(searchInput) || user?.carGRZ?.includes(searchInput))
    ));

  }, [searchInput]);

  return (
    <>
      <div className="container">
        <div className="search-field">
          <Input allowClear={true} onChange={changeSearch} placeholder="Номер авто" />
        </div>
        <div className="admin-users">
          <div className="admin-page__bg">
            <Watermark content="vagcheb"/>
          </div>
          <Header title={"Пользователи"}/>
          <ul className="admin-users__list">
            {users.length === 0 ? <Loader /> : ''}
            {searchInput !== '' && filteredUsers.length === 0 && <Empty description={'Не найдено'} />}
            {searchInput === '' && filteredUsers.length === 0 ? users.map((user) => {
                return (
                  <li key={user.id} className="admin-users__item admin-user-item">
                    <div className="admin-user-item__body">
                      <div className="admin-user-item__info">
                        <div onClick={() => handleShowDeleteUserModal(user.id)} className="admin-user-item__delete">
                          <DeleteOutlined/>
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
                        {/*<img src={`${API}api/image/small/${user.carImage}_small.jpeg`} alt=""/>*/}
                        <Image
                          preview={{
                            src: API + "api/image/" + user.carImage,
                            mask: 'Просмотр',
                            toolbarRender: () => null,
                          }}
                          loading="lazy"
                          key={user.chatId}
                          onError={(e) => {
                            e.target.src = `${API}api/icons/not_found.png`
                          }}
                          src={`${API}api/image/small/${user.carImage}_small.jpeg`}
                          alt={`${user.carbrand} ${user.carModel}`}
                        />
                      </div>
                    </div>
                  </li>
                )
              }) : ''}
            {searchInput !== '' && filteredUsers.length ? filteredUsers.map((user) => {
                return (
                  <li key={user.id} className="admin-users__item admin-user-item">
                    <div className="admin-user-item__body">
                      <div className="admin-user-item__info">
                        <div onClick={() => handleShowDeleteUserModal(user.id)} className="admin-user-item__delete">
                          <DeleteOutlined/>
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
                        {/*<img src={`${API}api/image/small/${user.carImage}_small.jpeg`} alt=""/>*/}
                        <Image
                          preview={{
                            src: API + "api/image/" + user.carImage,
                            mask: 'Просмотр',
                            toolbarRender: () => null,
                          }}
                          loading="lazy"
                          key={user.chatId}
                          onError={(e) => {
                            e.target.src = `${API}api/icons/not_found.png`
                          }}
                          src={`${API}api/image/small/${user.carImage}_small.jpeg`}
                          alt={`${user.carbrand} ${user.carModel}`}
                        />
                      </div>
                    </div>
                  </li>
                )
              }) : ''}
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
      <Modal
        title="Действительно удалить пользователя?"
        open={deleteUserModalOpen}
        onOk={deleteUser}
        onCancel={handleCancelDeleteUser}
        destroyOnClose={true}
        centered={true}
        okText={'Удалить'}
        cancelText={'Отмена'}
      />
    </>
  );
};

export default UserList;
