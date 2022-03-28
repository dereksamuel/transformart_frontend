import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "../store/actions/categories";
import { getCategoriesProducts } from "../store/actions/categoriesProducts";
import { getProducts } from "../store/actions/products";

const useCP = (categoryId) => {
  const [categoriesProductsArray, setCategoriesProductsArray] = useState([]);

  const categoriesProducts = useSelector((state) => state.categoriesProducts.all);
  const categories = useSelector((state) => state.categories.all);
  const products = useSelector((state) => state.products.all);

  const dispatch = useDispatch();

  const onLoadProducts = async () => {
    await dispatch(getCategoriesProducts());
    dispatch(getProducts());
    dispatch(getCategories());
  };

  const onDoCategoriesProducts = () => {
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

        renderCategoriesProduct[byCategories].products.add(product);
      } else {
        renderCategoriesProduct[byCategories].products.add(product);
      }
    }

    if (categoryId) {
      const filteredCategoriesProduct = Object.entries(renderCategoriesProduct).filter((rcp) => {
        return rcp[1].categoriesProductId === Number(categoryId);
      });

      setCategoriesProductsArray(filteredCategoriesProduct);
      return;
    }

    setCategoriesProductsArray(Object.entries(renderCategoriesProduct));
  };

  useEffect(() => {
    if (!categoriesProducts.length) {
      onLoadProducts();
    }
  }, []);

  useEffect(() => {
    if (categoriesProducts?.length || categories?.length || products?.length) {
      onDoCategoriesProducts();
    }
  }, [categoriesProducts, categories, products]);

  return categoriesProductsArray;
};

export {
  useCP
};
