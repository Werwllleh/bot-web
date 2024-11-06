export const validateCarNumber = new RegExp(
  /^[АВЕКМНОРСТУХ]{1}[0-9]{2}[0-9]{1}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/
);

export const validateName = new RegExp(/^[А-Яа-яЁё\s]+$/);

