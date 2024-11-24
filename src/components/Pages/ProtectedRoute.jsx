import React, {useEffect} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useUsersStore} from "../../services/store";
import {checkObject} from "../../utils/checkObject";

const ProtectedRoute = ({ onlyUnAuth = false, component, adminOnly = false }) => {
  const isAuthChecked = useUsersStore((state) => state.isAuthChecked);
  const userData = useUsersStore((state) => state.userData);
  const isAdmin = useUsersStore((state) => state.isAdmin);

  const location = useLocation();

  if (!isAuthChecked) {
    console.log("Чекаем пользователя");
    // Запрос еще выполняется
    // Выводим прелоадер
    return null;
  }

  if (onlyUnAuth && checkObject(userData)) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !checkObject(userData)) {
    // Пользователь не авторизован
    return <Navigate to="/registration" state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin) {
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
