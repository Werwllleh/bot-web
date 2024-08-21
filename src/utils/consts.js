import {FormOutlined, UsergroupAddOutlined, NotificationOutlined} from "@ant-design/icons";
import React from "react";

// export const SITE = 'https://vagcheb.ru/';
export const API = 'https://vagcheb.ru/';
export const VOLKSWAGEN = 'volkswagen';
export const SKODA = 'skoda';
export const AUDI = 'audi';
export const SEAT = 'seat';
export const BENTLEY = 'bentley';
export const LAMBORGHINI = 'lamborghini';

export const cars = {
  'volkswagen': [
    'amarok', 'arteon', 'atlas', 'atlas cross sport', 'beetle', 'bora', 'caddy', 'caravelle', 'golf', 'golf plus', 'golf GTI', 'golf R', 'ID.3', 'ID.4', 'ID.5', 'ID.6', 'ID.7', 'jetta', 'jetta GLI', 'multivan', 'passat', 'passat Alltrack', 'passat CC', 'phaeton', 'polo', 'cross polo', 'scirocco', 'sharan', 'taos', 'teramont', 'tiguan', 'touareg', 'touran', 'transporter'
  ],
  'skoda': [
    'fabia', 'fabia RS', 'kamiq', 'karoq', 'kodiaq', 'kodiaq RS', 'octavia', 'octavia RS', 'rapid', 'roomster', 'scala', 'superb', 'yeti'
  ],
  'audi': [
    '80', '100', 'A1', 'A3', 'A4', 'A4 Allroad', 'A5', 'A6', 'A6 Allroad', 'A7', 'A8', 'e-tron', 'Q3', 'Q3 Sportback', 'Q5', 'Q5 e-tron', 'Q5 Sportback', 'SQ5', 'Q6', 'Q7', 'Q8', 'SQ8', 'RS Q8', 'RS5', 'RS6', 'RS7', 'S5', 'S6', 'S8', 'TT', 'R8',
  ],
  'seat': [
    'alhambra', 'altea', 'arosa', 'ateca', 'cordoba', 'ibiza', 'leon', 'leon cupra', 'tarraco', 'toledo',
  ],
  'bentley': [
    'bentayga', 'continental Flying Spur', 'continental GT', 'flying Spur', 'mulsanne',
  ],
  'lamborghini': [
    'aventador', 'gallardo', 'huracan', 'murcielago', 'urus',
  ]
}

const avitoLink = 'https://www.avito.ru/cheboksary/zapchasti_i_aksessuary/vw_club21_3995153485?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller';

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

export const admins = [446012794, 361881710]

export const adminPages = [
  {
    icon: <FormOutlined/>,
    title: 'Список отзывов',
    link: '/feedback-list'
  },
  {
    icon: <UsergroupAddOutlined/>,
    title: 'Список пользователей',
    link: '/user-list'
  },
  {
    icon: <NotificationOutlined/>,
    title: 'Уведомления',
    link: '/notification'
  },
]

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
