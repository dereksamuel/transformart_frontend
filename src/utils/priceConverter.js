const priceConverter = (price) => {
  return new Intl.NumberFormat("es-CO", {
    currency: "COP"
  }).format(price);
};

export {
  priceConverter
};
