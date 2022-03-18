import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon } from "@heroicons/react/outline";

import srcLogoIcon from "../assets/images/mobile/logoIcon.svg";
import { getProducts } from "../store/actions/products";
import { getCategories } from "../store/actions/categories";
import { getCategoriesProducts } from "../store/actions/categoriesProducts";

import { Title } from "../components/Title";
import { ProductItem } from "../components/ProductItem";
import { Button } from "../components/Button";

import "./Products.css";
import { useNavigate } from "react-router";

function Products() {
  const categoriesProducts = useSelector((state) => state.categoriesProducts.all);
  const categories = useSelector((state) => state.categories.all);
  const products = useSelector((state) => state.products.all);

  const [categoriesProductsArray, setCategoriesProductsArray] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoadProducts = () => {
    dispatch(getCategoriesProducts());
    dispatch(getProducts());
    dispatch(getCategories());
  };

  const onSeeMore = (categoryId) => {
    navigate({ pathname: `/categories/${categoryId}` });
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
          products.find((product) => product.id === categoriesProduct.productsId)
        );
      } else {
        if (renderCategoriesProduct[byCategories].products.size !== 5) {
          renderCategoriesProduct[byCategories].products.add(
            products.find((product) => product.id === categoriesProduct.productsId)
          );
        }
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
        <Title className="SubTitle TitleProducts" istitle={false}>
          <img src={srcLogoIcon} alt="srcLogoIcon" className="Products-srcLogoIcon" />
          <span>Productos</span>
        </Title>
        {
          categoriesProductsArray.length && categoriesProductsArray.map((categoriesProductsItem) => (
            <div className="ProductsArray" key={categoriesProductsItem[1].category.id}>
              <Title
                className="SubTitle TitleEachProduct"
              >{categoriesProductsItem[1].category.name}</Title>
              <div className="ProductsGrid">
                {
                  [...categoriesProductsItem[1].products].map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                }
              </div>
              <Button
                className="PrimaryWave ButtonSecondaryClick"
                onClick={() => onSeeMore(categoriesProductsItem[1].category.id)}
              >
                <span>Ver más</span>
                <span className="IconSeeMore"><EyeIcon /></span>
              </Button>
            </div>
          ))
        }
      </article>
    </div>
  );
}

export default Products;
