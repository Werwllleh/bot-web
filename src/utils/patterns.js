export const validateCarNumber = new RegExp(
  /^[АВЕКМНОРСТУХ]{1}[0-9]{2}[0-9]{1}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/
);

export const validateName = new RegExp(/^[А-Яа-яЁё\s]+$/);

export const validateLinkPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,6}(\/.*)?$/;










// Функции для валидации

export const validateLinks = (linksData) => {

  // Если `linksData` строка, превращаем ее в массив для унифицированной обработки
  if (typeof linksData === "string") {
    linksData = [linksData];
  }

  // Проверяем массив ссылок
  if (Array.isArray(linksData) && linksData.length) {
    const formattedLinks = linksData.map((link) => {
      const trimmedLink = link.trim();

      // Проверяем соответствие паттерну
      if (validateLinkPattern.test(trimmedLink)) {
        // Приводим ссылку к единому формату
        return formatLink(trimmedLink);
      }

      return null; // Отбрасываем невалидные ссылки
    });

    const validateLinksArray = formattedLinks.filter((link) => link !== null);
    // Возвращаем только валидные и отформатированные ссылки
    return validateLinksArray;
  }

  return []; // Возвращаем пустой массив, если входные данные некорректны
};

// Функция для форматирования ссылки к виду https://ya.ru
export const formatLink = (link) => {
  let normalizedLink = link.trim();

  // Убираем "www." если присутствует
  normalizedLink = normalizedLink.replace(/^https?:\/\/www\./, "https://").replace(/^www\./, "");

  // Добавляем "https://" если отсутствует
  if (!normalizedLink.startsWith("http")) {
    normalizedLink = `https://${normalizedLink}`;
  }

  // Удаляем слэши в конце
  return normalizedLink.replace(/\/+$/, "");
};

// Функция для валидации номера
export const validatePhoneNumbers = (phoneNumbers) => {
  if (typeof phoneNumbers === "string") {
    phoneNumbers = [phoneNumbers];
  }

  // Применяем нормализацию ко всем номерам и отбрасываем невалидные
  return phoneNumbers
    .map((phone) => normalizePhone(phone.trim()))
    .filter((phone) => phone !== null); // Убираем невалидные номера
};

// Функция для нормализации одного номера
export const normalizePhone = (phone) => {
  const digits = phone.replace(/[^0-9]/g, ""); // Убираем все, кроме цифр

  if (digits.length === 10) {
    // Если номер состоит из 10 цифр, добавляем +7
    return `+7${digits}`;
  } else if (digits.length === 11 && digits.startsWith("8")) {
    // Если номер состоит из 11 цифр и начинается с 8, заменяем на +7
    return `+7${digits.slice(1)}`;
  } else if (digits.length === 11 && digits.startsWith("7")) {
    // Если номер состоит из 11 цифр и начинается с 7, добавляем +7
    return `+7${digits.slice(1)}`;
  } else if (digits.length === 12 && digits.startsWith("7")) {
    // Если номер уже в формате +7, оставляем как есть
    return `+${digits}`;
  }

  // Если номер невалиден, возвращаем null
  return null;
};

// Функция для проверки координат
export const validateCoordinates = (coordinates) => {
  // Проверяем, является ли значение массивом длиной 2
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return null;
  }

  // Шаблон для проверки формата координаты: две цифры, точка, шесть цифр
  const coordinatePattern = /^-?\d{2}\.\d{6}$/;

  // Проверяем и форматируем каждую координату
  const formattedCoordinates = coordinates.map((coordinate) => {
    const trimmedCoordinate = coordinate.trim(); // Убираем лишние пробелы
    return coordinatePattern.test(trimmedCoordinate) ? parseFloat(trimmedCoordinate).toFixed(6) : null;
  });

  // Если любая из координат невалидна, возвращаем null
  if (formattedCoordinates.includes(null)) {
    return null;
  }

  return formattedCoordinates;
};