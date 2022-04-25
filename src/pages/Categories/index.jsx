import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AdjustmentsIcon, ChevronUpIcon, EyeIcon, XIcon } from "@heroicons/react/outline";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

import { Title } from "../../components/Title";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { Acordion } from "../../components/Acordion";
import { EmptyDraw } from "../../components/EmptyDraw";
import { Banner } from "../../components/Banner";

import { useCP } from "../../hooks/useCP";
import { getCategoriesProducts } from "../../store/actions/categoriesProducts";

import "./styles.css";

function Categories() {
  const categoriesProductsArray = useCP();
  const [state, setState] = useState({
    showFilters: false,
    filtersCategories: new Set(),
    filtersPrice: null,
    categoriesProductsArray
  });
  const pricesArray = [
    {
      label: "menores a $50.000",
      value: "smaller"
    },
    {
      label: "mayores a $50.000",
      value: "higher"
    }
  ];

  const categories = useSelector((state) => state.categories.all);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSeeMore = (categoryId) => {
    navigate({ pathname: `/products/${categoryId}` });
  };

  const onChangeFilter = (value, type, typeFilter) => {
    const validation = typeFilter === "filtersCategories";
    let newFiltersSetter = validation ? (
      new Set(state.filtersCategories)
    ) : null;

    if (type === "delete")
      if (validation)
        newFiltersSetter.delete(value);
      else
        newFiltersSetter = null;
    else {
      if (validation)
        newFiltersSetter.add(value);
      else
        newFiltersSetter = value;
    }

    setState(validation ? {
      ...state,
      filtersCategories: newFiltersSetter
    } : {
      ...state,
      filtersPrice: newFiltersSetter
    });
  };

  const onChangeShowFilters = () => {
    setState({
      ...state,
      showFilters: !state.showFilters
    });
  };

  const onCleanAllFilters = () => {
    setState({
      ...state,
      filtersCategories: new Set(),
      filtersPrice: null
    });

    dispatch(getCategoriesProducts());
  };

  const onFilter = (condition) => {
    return categoriesProductsArray.map((cp) => {
      const resultProducts = [...cp.products].filter((product) => condition(product));

      if (!state.filtersPrice) {
        setState({
          ...state,
          categoriesProductsArray
        });
      }

      return {
        ...cp,
        products: resultProducts,
        resultProductsLength: resultProducts.length
      };
    });
  };

  const onFilterBy = (condition) => {
    const cpMapped = onFilter(condition);

    if (!state.filtersPrice) {
      setState({
        ...state,
        categoriesProductsArray
      });
      return;
    }

    setState({
      ...state,
      categoriesProductsArray: cpMapped.filter(
        (cp) => cp.resultProductsLength)
    });
  };

  const onFilterByCategory = () => {
    const queriesArray = [];

    for (const filter of state.filtersCategories) {
      queriesArray.push({
        categories_id: filter
      });
    }

    dispatch(
      getCategoriesProducts(queriesArray)
    );
  };

  useEffect(() => {
    if (state.filtersCategories.size) {
      onFilterByCategory();
    } else {
      dispatch(getCategoriesProducts());
    }
  }, [state.filtersCategories]);

  useEffect(() => {
    onFilterBy((product) => state.filtersPrice === "smaller" ?
      product.price < 50000 :
      product.price > 50000);
  }, [state.filtersPrice]);

  useEffect(() => {
    if (categoriesProductsArray) {
      if (state.filtersPrice) {
        onFilterBy((product) => state.filtersPrice === "smaller" ?
          product.price < 50000 :
          product.price > 50000);
      }

      if (!state.filtersPrice) {
        setState({
          ...state,
          categoriesProductsArray
        });
      }
    }
  }, [categoriesProductsArray]);

  useEffect(() => {
    return () => {
      dispatch(getCategoriesProducts());
    };
  }, []);

  return (
    <div className="Categories page">
      <article>
        <Title className="SubTitle TitleButterFly" isTitle={false}>
          <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
          <span>Productos</span>
        </Title>
        <div className="FilterContainer FilterLinks">
          <Acordion className="FilterItem">
            <button
              className="button-without-styles ButtonAcordionTitle"
              onClick={onChangeShowFilters}
            >
              <div className="AcordionTitle Dark">
                <div className="AcordionTitle__Svg">
                  <AdjustmentsIcon className="AcordionTitleIcon" />
                  <h4 className="AcordionTitle__Text">Filtrar por</h4>
                </div>
                <ChevronUpIcon
                  className={"AcordionTitleIcon " + (
                    !state.showFilters && "rotateArrow"
                  )}
                />
              </div>
            </button>
            {
              state.showFilters ? (
                <div className="AcordionBodyDark">
                  <h4 className="filterText">Categorías:</h4>
                  <div className="BannerContainer">
                    {
                      (categories && categories.length) && categories.map((category, indexCategory) => (
                        <li
                          key={indexCategory}
                          className={
                            `BannerLi ${state.filtersCategories.has(category.id) && "SelectedBanner"}`
                          }
                        >
                          <Banner>
                            {
                              state.filtersCategories.has(category.id) && (
                                <XIcon
                                  className="Icon"
                                  onClick={() => onChangeFilter(category.id, "delete", "filtersCategories")}
                                />
                              )
                            }
                            <span
                              className="Text"
                              onClick={() => onChangeFilter(category.id, "add", "filtersCategories")}
                            >{category.name}</span>
                          </Banner>
                        </li>
                      ))
                    }
                  </div>
                  <h4 className="filterText">Precios:</h4>
                  <div className="BannerContainer">
                    {
                      pricesArray.map((price, index) => (
                        <li
                          key={index}
                          className={
                            `BannerLi ${state.filtersPrice === price.value && "SelectedBanner"}`
                          }
                        >
                          <Banner>
                            {
                              state.filtersPrice === price.value && (
                                <XIcon
                                  className="Icon"
                                  onClick={() => onChangeFilter(price.value, "delete", "filterPrices")}
                                />
                              )
                            }
                            <span
                              className="Text"
                              onClick={() => onChangeFilter(price.value, "add", "filterPrices")}
                            >{ price.label }</span>
                          </Banner>
                        </li>
                      ))
                    }
                  </div>
                </div>
              ) : ""
            }
          </Acordion>
          {
            state.filtersCategories.size || state.filtersPrice ? (
              <button
                className="button-without-styles FilterLinkClean"
                onClick={onCleanAllFilters}
              >
                Limpiar filtro{
                  (
                    state.filtersCategories.size + Boolean(state.filtersPrice)
                  ) > 1 ? "s" : ""
                }, tienes {
                  (state.filtersCategories.size) + Boolean(state.filtersPrice)
                } activo{(
                  state.filtersCategories.size + Boolean(state.filtersPrice)
                ) > 1 ? "s" : ""}
              </button>
            ) : ""
          }
        </div>
        {
          state.categoriesProductsArray.length ? state.categoriesProductsArray.map((categoriesProductsItem, indexCP) => (
            <div className="CategoriesArray" key={categoriesProductsItem.category?.id || indexCP}>
              <Title
                className="SubTitle TitleEachCategory"
              >{categoriesProductsItem.category?.name}</Title>
              <div className="CategoriesGrid">
                {
                  [...categoriesProductsItem.products].map((product, indexProduct) => (
                    ((indexProduct + 1) <= 4 && product) &&
                      <ProductItem key={product.id} product={product} />
                  ))
                }
              </div>
              {
                [...categoriesProductsItem.products].length > 4 && (
                  <Button
                    className="PrimaryWave ButtonSecondaryClick"
                    onClick={() => onSeeMore(categoriesProductsItem.categoriesProductId)}
                  >
                    <span>Ver más</span>
                    <span className="IconSeeMore"><EyeIcon /></span>
                  </Button>
                )
              }
            </div>
          )) : (
            <div className="CategoriesEmpty">
              <EmptyDraw titleEmpty="No hay productos" />
            </div>
          )
        }
      </article>
    </div>
  );
}

export {
  Categories
};
