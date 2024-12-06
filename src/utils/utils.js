export const num_word = (value, words) => {
  value = Math.abs(value) % 100;
  let num = value % 10;
  if(value > 10 && value < 20) return words[2];
  if(num > 1 && num < 5) return words[1];
  if(num === 1) return words[0];
  return words[2];
}

/*function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}*/

/*function formatDate(date) {
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
}*/

/*
export const getTime = (nowDate) => {
  let dateObject = new Date(nowDate);
  dateObject.setHours(dateObject.getHours());
  return formatDate(dateObject);
}*/

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getScrollbarWidth = () => {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

}

export const offsetContent = (active) => {

  const htmlBody = document.querySelector('html');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  if (active) {
    htmlBody.classList.add('block');
    // htmlBody.style.marginRight = `${getScrollbarWidth()}px`;
    // header.style.marginRight = `${getScrollbarWidth()}px`;
    // footer.style.marginRight = `${getScrollbarWidth()}px`;
  } else {
    // htmlBody.style.marginRight = '';
    // header.style.marginRight = '';
    // footer.style.marginRight = '';
    htmlBody.classList.remove('block');
  }
}