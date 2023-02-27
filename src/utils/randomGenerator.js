export const numString = (lenght) => {
  let num = "";

  for (let i = 0; i < lenght; i++) {
    num += Math.floor(Math.random() * 10);
  }

  return num;
};
