export const isValidPrice = numb => {
  if (isNaN(Number(numb))) return "Please insert a number";
  else if (numb < 0) return "Number cannot be negative";
  else return "ok";
};

export const isEmpty = el => {
  if (el === "") {
    return true;
  } else {
    return false;
  }
};
