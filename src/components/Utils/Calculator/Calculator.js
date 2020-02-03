//to calculate the percentage change
export function calcChange(price, prevClose) {
  return (
    ((Number(price) - Number(prevClose.replace(/,/g, ""))) * 100) /
    Number(price)
  ).toFixed(2);
}

//to show change in color
export function determineChange(price, prevClose) {
  return calcChange(price, prevClose) > 0
    ? "pos-change"
    : calcChange(price, prevClose) < 0
    ? "neg-change"
    : "no-change";
}
