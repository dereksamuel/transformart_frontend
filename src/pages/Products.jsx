import React, { useEffect } from "react";
import { Title } from "../components/Title";

import srcLogoIcon from "../assets/images/mobile/logoIcon.svg";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/products";
import { getCategories } from "../store/actions/categories";
import { getCategoriesProducts } from "../store/actions/categoriesProducts";

function Products() {
  const categoriesProducts = useSelector((state) => state.categoriesProducts.all);
  const categories = useSelector((state) => state.categories.all);
  const products = useSelector((state) => state.products.all);

  const renderCategoriesProduct = {};
  const dispatch = useDispatch();

  const onLoadProducts = () => {
    dispatch(getCategoriesProducts());
    dispatch(getProducts());
    dispatch(getCategories());
  };

  const onDoCategoriesProducts = () => {
    for (const categoriesProduct of categoriesProducts) {
      let byCategories = categories.find((category) => category.id === categoriesProduct.categoriesId).name;

      if (!renderCategoriesProduct[byCategories]) {
        renderCategoriesProduct[byCategories] = [
          products.find((products) => products.id === categoriesProduct.productsId)
        ];
      } else {
        renderCategoriesProduct[byCategories].push(
          products.find((products) => products.id === categoriesProduct.productsId)
        );
      }
    }

    console.log(renderCategoriesProduct);
  };

  useEffect(() => {
    if (!categoriesProducts.length) {
      onLoadProducts();
    }

    if (categoriesProducts.length && categories.length && products.length) {
      onDoCategoriesProducts();
    }
  }, [categoriesProducts, categories, products]);

  return (
    <div className="Products">
      <article>
        <Title className="SubTitle TitleProducts">
          <img src={srcLogoIcon} alt="srcLogoIcon" className="Products-srcLogoIcon" />
          <span>Productos</span>
        </Title>
        <Title className="SubTitle TitleEachProduct"></Title>
      </article>
    </div>
  );
}

export default Products;