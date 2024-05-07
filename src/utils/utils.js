export const num_word = (value, words) => {
  value = Math.abs(value) % 100;
  let num = value % 10;
  if(value > 10 && value < 20) return words[2];
  if(num > 1 && num < 5) return words[1];
  if(num === 1) return words[0];
  return words[2];
}

function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}

function formatDate(date) {
  // Получаем компоненты даты и времени
  let day = padZero(date.getDate());
  let month = padZero(date.getMonth() + 1); // Месяцы в Date объекте начинаются с 0
  let year = date.getFullYear();
  let hours = padZero(date.getHours());
  let minutes = padZero(date.getMinutes());

  // Возвращаем собранный форматированный текст
  return (
    <div className={'time-class'}>
      <span className={'time-class__date'}>{day}.{month}.{year}</span>
      <span className={'time-class__time'}>{hours}:{minutes}</span>
    </div>
  );
}

export const getTime = (nowDate) => {
  let dateObject = new Date(nowDate);
  dateObject.setHours(dateObject.getHours());
  return formatDate(dateObject);
}