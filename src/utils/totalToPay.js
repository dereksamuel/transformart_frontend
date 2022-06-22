import { priceConverter } from "./priceConverter.js";

const totalToPay = (products) => {
  const total = products.reduce((acumulador, value) => {
    const backPrice = +value.count > 1 ? (+value.price * +value.count) : +value.price;

    return backPrice + acumulador;
  }, 0);
  return priceConverter(total);
};

export {
  totalToPay
};
