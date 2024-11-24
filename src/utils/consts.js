import {FormOutlined, UsergroupAddOutlined, NotificationOutlined} from "@ant-design/icons";
import React from "react";
import TelegramIcon from "../components/icons/telegram-icon";
import InstagramIcon from "../components/icons/instagram-icon";

// export const SITE = 'https://vagcheb.ru/';
export const API = 'http://localhost';
// export const API = 'https://vagcheb.ru/';

const SITE = 'http://localhost:5000';
export const API_BASE = `${SITE}/api`;


const avitoLink = 'https://www.avito.ru/cheboksary/zapchasti_i_aksessuary/vw_club21_3995153485';

export const stickersTitles = {
  'sk_color': ['Наклейка Skoda цветная', 300, avitoLink],
  'sk_gray': ['Наклейка Skoda антихром', 500, avitoLink],
  'sk_perl': ['Наклейка Skoda перламутр', 600, avitoLink],
  'vw_color': ['Наклейка Volkswagen цветная', 300, avitoLink],
  'vw_gray': ['Наклейка Volkswagen антихром', 500, avitoLink],
  'vw_perl': ['Наклейка Volkswagen перламутр', 600, avitoLink],
  'audi_color': ['Наклейка Audi цветная', 300, avitoLink],
  'audi_gray': ['Наклейка Audi антихром', 500, avitoLink],
  'audi_perl': ['Наклейка Audi перламутр', 600, avitoLink],
  'aromatizers': ['Ароматизаторы', 150, avitoLink],
}

export const userStatusValue = {
  ADMIN: 'admin',
  USER: 'user',
}

export const admins = [446012794]

export const places = [
  {
    value: '56.143734, 47.237596',
    label: 'Театр оперы и балета',
  },
  {
    value: '56.135153, 47.242049',
    label: 'Парковка ТЦ Карусель'
  },
  {
    value: '56.136111, 47.238371',
    label: 'Нижняя парковка Каскада'
  },
  {
    value: '56.147669, 47.260320',
    label: 'Речной порт'
  },
  {
    value: 'other',
    label: 'Другое место'
  }
]

export const menu = [
  {
    title: 'Наши авто',
    url: '/'
  },
  {
    title: 'Партнеры',
    url: '/partners',
    color: '#F4F7FB'
  },
  {
    title: 'Профиль',
    url: '/profile',
    color: '#F4F7FB'
  },
];

export const route = {
  REGISTER: {
    title: 'Регистрация',
    url: '/registration',
    color: '#F4F7FB'
  },
  PARTNERS: {
    title: 'Партнеры',
    url: '/partners',
    color: '#F4F7FB'
  },
  PROFILE: {
    title: 'Профиль',
    url: '/profile',
    color: '#F4F7FB'
  },
  CARS: {
    title: 'Наши авто',
    url: '/',
    color: '#F4F7FB'
  },
  ADMIN: {
    title: 'Админ панель',
    url: '/admin',
    color: '#F4F7FB'
  },
  ADMIN_PARTNERS: {
    title: 'Управление партнерами',
    url: '/admin/partners',
    color: '#F4F7FB'
  },
  ADMIN_USERS: {
    title: 'Управление пользователями',
    url: '/admin/users',
    color: '#F4F7FB'
  },
  ADMIN_MEET: {
    title: 'Управление встречами',
    url: '/admin/meet',
    color: '#F4F7FB'
  },
  NF_404: {
    title: '',
    url: '*',
    color: '#F4F7FB'
  },
}

export const adminPages = [
  {
    title: route.ADMIN.title,
    url: route.ADMIN.url,
    color: route.ADMIN.color,
  },
  {
    title: route.ADMIN_PARTNERS.title,
    url: route.ADMIN_PARTNERS.url,
    color: route.ADMIN_PARTNERS.color,
  },
  {
    title: route.ADMIN_USERS.title,
    url: route.ADMIN_USERS.url,
    color: route.ADMIN_USERS.color,
  },
  {
    title: route.ADMIN_MEET.title,
    url: route.ADMIN_MEET.url,
    color: route.ADMIN_MEET.color,
  },
]

export const socialLinks = [
  {
    title: 'telegram',
    link: 'https://t.me/+A6S11dagaDA2OWMy',
    icon: <TelegramIcon/>
  },
  {
    title: 'instagram',
    link: 'https://www.instagram.com/vag_club21',
    icon: <InstagramIcon/>
  },
]
