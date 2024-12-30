import React, {useEffect, useState} from 'react';
import {useUsersStore} from "../../../services/store";
import dayjs from "dayjs";
import MainModal from "../../MainModal/MainModal";
import {checkObject} from "../../../utils/checkObject";

const AdminUsers = () => {

  const [isModalActive, setModalActive] = useState(false);
  const [aboutDataModal, setAboutDataModal] = useState({});
  const [usersList, setUsersList] = useState([]);

  const users = useUsersStore((state) => state.users);
  const usersCars = useUsersStore((state) => state.usersCars);

  const updateUsers = useUsersStore((state) => state.updateUsers);
  const updateUsersCars = useUsersStore((state) => state.updateUsersCars);

  useEffect(() => {
    updateUsers();
    updateUsersCars();
  }, []);

  useEffect(() => {
    setUsersList(users.reverse())
    // console.log(usersCars)
  }, [users])

  useEffect(() => {
    // console.log(usersList)
  }, [usersList]);

  const getInfoAboutUser = async (chatId) => {
    const userData = users.filter((user) => user.chat_id === chatId)[0];
    setAboutDataModal(userData)
    setModalActive(true);

    // console.log(userData)
  }

  const handleModalClose = () => {
    setModalActive(false);
    setTimeout(() => {
      setAboutDataModal({})
    }, 200)
  };

  return (
    <>
      <div className="page-admin-users">
        <div className="container">
          <h1 className="page-admin-users__title h1t">Управление пользователями</h1>
          <div className="page-admin-users__body">
            <div className="page-admin-users__list">
              {usersList.length > 0 && usersList.map((user, index) => {
                return (
                  <div onClick={() => getInfoAboutUser(user.chat_id)} key={user.id}
                       className="page-admin-users__user user-card">
                    <div className="user-card__body">
                      <div className="user-card__header">
                        <div className="user-card__id">{index + 1}.</div>
                        <div className="user-card__name">{user.user_name}</div>
                      </div>
                      <div className="user-card__info">
                        <div className="user-card__field">
                          <p className="user-card__field-text">Регистрация:</p>
                          <div
                            className="user-card__field-value">{dayjs(user.createdAt).format('DD-MM-YYYY HH:mm')}</div>
                        </div>
                        <div className="user-card__field">
                          <p className="user-card__field-text">chatId:</p>
                          <div className="user-card__field-value">{user.chat_id}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{backgroundColor: user.user_color}} className="user-card__bg"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <MainModal
        className="page-admin-users__modal"
        title={`Пользователь ${checkObject(aboutDataModal) ? aboutDataModal.chat_id : ''}`}
        isOpen={isModalActive}
        onClose={handleModalClose}
      >
        <div className="page-admin-users__modal-body">
          <div className="page-admin-users__modal-info">
            {checkObject(aboutDataModal) && aboutDataModal.id}
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default AdminUsers;
