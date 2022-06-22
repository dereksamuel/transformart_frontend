
const onDoCategoriesProducts = ({
  categoriesProducts
}) => {
  const renderCategoriesProduct = {};

  for (const categoriesProduct of categoriesProducts) {
    let byCategories = categoriesProduct.categoriesId;
    const product = products.find((product) => product.id === categoriesProduct.productsId);

    if (!renderCategoriesProduct[byCategories]) {
      renderCategoriesProduct[byCategories] = {
        categoriesProductId: categoriesProduct.id,
        category: categories.find((category) => category.id === categoriesProduct.categoriesId),
        products: new Set()
      };

      onAddProduct({
        product,
        renderCategoriesProduct,
        byCategories
      });
    } else {
      onAddProduct({
        product,
        renderCategoriesProduct,
        byCategories
      });
    }
};

export {
  onDoCategoriesProducts
};
