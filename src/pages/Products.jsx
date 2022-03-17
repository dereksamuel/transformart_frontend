import React, { useEffect, useState } from "react";

import srcLogoIcon from "../assets/images/mobile/logoIcon.svg";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/products";
import { getCategories } from "../store/actions/categories";
import { getCategoriesProducts } from "../store/actions/categoriesProducts";

import { Title } from "../components/Title";
import { ProductItem } from "../components/ProductItem";
import { Button } from "../components/Button";

function Products() {
  const categoriesProducts = useSelector((state) => state.categoriesProducts.all);
  const categories = useSelector((state) => state.categories.all);
  const products = useSelector((state) => state.products.all);

  const [categoriesProductsArray, setCategoriesProductsArray] = useState([]);

  const dispatch = useDispatch();

  const onLoadProducts = () => {
    dispatch(getCategoriesProducts());
    dispatch(getProducts());
    dispatch(getCategories());
  };

  const onDoCategoriesProducts = () => {
    const renderCategoriesProduct = {};

    for (const categoriesProduct of categoriesProducts) {
      let byCategories = categoriesProduct.categoriesId;

      if (!renderCategoriesProduct[byCategories]) {
        renderCategoriesProduct[byCategories] = {
          category: categories.find((category) => category.id === categoriesProduct.categoriesId),
          products: new Set()
        };

        renderCategoriesProduct[byCategories].products.add(
          products.find((products) => products.id === categoriesProduct.productsId)
        );
      } else {
        renderCategoriesProduct[byCategories].products.add(
          products.find((products) => products.id === categoriesProduct.productsId)
        );
      }
    }

    setCategoriesProductsArray(Object.entries(renderCategoriesProduct));
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
        <Title className="SubTitle TitleProducts" isTitle={false}>
          <img src={srcLogoIcon} alt="srcLogoIcon" className="Products-srcLogoIcon" />
          <span>Productos</span>
        </Title>
        {
          categoriesProductsArray.length && categoriesProductsArray.map((categoriesProductsItem) => (
            <div className="ProductsArray" key={categoriesProductsItem[1].category.id}>
              <Title
                className="SubTitle TitleEachProduct"
                isTitle={false}
              >{categoriesProductsItem[1].category.name}</Title>
              <div className="ProductsGrid">
                {
                  [...categoriesProductsItem[1].products].map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                }
              </div>
              <Button className="PrimaryWave ButtonSecondaryClick">
                <span>Ver más</span>
              </Button>
            </div>
          ))
        }
      </article>
    </div>
  );
}

export default Products;
