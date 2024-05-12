import React, {useEffect, useState} from 'react';
import {getUsersData} from "../../../utils/usersUtils";
import {Watermark} from "antd";
import Header from "../../Header/Header";

const UserList = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersData()
      .then(res => setUsers(res.data))
  }, []);

  console.log(users)

  return (
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
                <li className="admin-users__item">
                  {user.id}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default UserList;
