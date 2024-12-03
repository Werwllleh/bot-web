import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useUsersStore} from "../../services/store";
import {checkObject} from "../../utils/checkObject";
import Loader from "../Loader/Loader";
import {getUserInfo} from "../../api/api-users";

const ProtectedRoute = ({ onlyUnAuth = false, component, adminOnly = false }) => {
  const isAuthChecked = useUsersStore((state) => state.isAuthChecked);

  const userTelegramData = useUsersStore((state) => state.userTelegramData);
  const userData = useUsersStore((state) => state.userData);
  const isAdmin = useUsersStore((state) => state.isAdmin);

  const updateUserData = useUsersStore((state) => state.updateUserData);


  useEffect(() => {
    if (userTelegramData?.id) {

      getUserInfo(userTelegramData?.id).then(res => {
        if (res.data !== '') {
          updateUserData(res.data)
        }
      })
    }
  }, [userTelegramData]);

  const location = useLocation();


  if (!isAuthChecked) {
    console.log("Чекаем пользователя");
    return <Loader/>;
  }

  if (onlyUnAuth && checkObject(userData)) {
    // setLoading(false);
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !checkObject(userData)) {
    // setLoading(false);
    // Пользователь не авторизован
    return <Navigate to="/registration" state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin) {
    // setLoading(false);
    // Пользователь не является администратором
    return <Navigate to="/" state={{ from: location }} />;
  }

  return component;
};

// Компонент для маршрутов, доступных только администраторам
export const OnlyAdminRoute = ({ component }) => (
  <ProtectedRoute adminOnly={true} component={component} />
);

// Остальные маршруты остаются неизменными
export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
