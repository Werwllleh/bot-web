import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useUsersStore} from "../../services/store";

const ProtectedRoute = ({onlyUnAuth = false, component}) => {

  const isAuthChecked = useUsersStore((state) => state.isAuthChecked);
  const userData = useUsersStore((state) => state.userData);

  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер
    return null;
  }

  if (onlyUnAuth && userData) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const {from} = location.state || {from: {pathname: "/"}};
    return <Navigate to={from} replace/>
  }

  if (!onlyUnAuth && !userData) {
    return <Navigate to="/registration" state={{from: location}}/>;
  }

  return component;

};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({component}) => (
  <ProtectedRoute onlyUnAuth={true} component={component}/>
);