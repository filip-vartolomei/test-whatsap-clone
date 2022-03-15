export const ls = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
};

export const COLORS = ['#9561e2', '#9561e2', '#f6993f', '#3f37c9', '#bb3e03', '#43aa8b', '#ff006e'];

export const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const MESSAGE_TYPE = {
  message: 1,
  media: 2,
  chatDate: 3, // Data de creare
  encryption: 4, // Encryption information
  messageInfo: 5, // message info : created group name...
};
