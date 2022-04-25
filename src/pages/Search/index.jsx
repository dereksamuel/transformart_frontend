import React, { useEffect, useState } from "react";
import { AdjustmentsIcon, ChevronUpIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";
import { useCP } from "../../hooks/useCP";
import { useModel } from "../../hooks/useModel";

import { Title } from "../../components/Title";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { EmptyDraw } from "../../components/EmptyDraw";
import { Banner } from "../../components/Banner";

import "./styles.css";
import { getCategoriesProducts } from "../../store/actions/categoriesProducts";
import { ProductItem } from "../../components/ProductItem";
import { Acordion } from "../../components/Acordion";

function Search() {
  const [search] = useModel({
    initialValue: "",
    domEl: "#search"
  });

  const categoriesProductsArray = useCP();
  const categories = useSelector((state) => state.categories.all);
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
  const [state, setState] = useState({
    showFilters: false,
    filtersCategories: new Set(),
    filtersPrice: null,
    categoriesProductsArray
  });

  const dispatch = useDispatch();

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

  const onFilter = (condition) => {
    return categoriesProductsArray.map((cp) => {
      const resultProducts = [...cp.products].filter((product) => condition(product));

      if (!search || !state.filtersPrice) {
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

    setState({
      ...state,
      categoriesProductsArray: cpMapped.filter(
        (cp) => cp.resultProductsLength)
    });
  };

  const onSearch = (event) => {
    event?.preventDefault();

    if (search) {
      const cpMapped = onFilter((product) => product.name.includes(search));

      setState({
        ...state,
        categoriesProductsArray: cpMapped.filter(
          (cp) => cp.resultProductsLength)
      });
    }
  };

  const onCleanAllFilters = () => {
    setState({
      ...state,
      filtersCategories: new Set(),
      filtersPrice: null
    });

    document.getElementById("search").value = "";

    dispatch(getCategoriesProducts());
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

      //FIXME: fix THE SEARCH IN THE FUTURE

      if (!state.filtersPrice) {
        setState({
          ...state,
          categoriesProductsArray
        });
      }
    }
  }, [categoriesProductsArray]);

  return (
    <div className="Search">
      <Title className="SubTitle TitleButterFly" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Buscar</span>
      </Title>
      <form className="SearchForm" onSubmit={onSearch}>
        <Input
          placeholder="Busca por tu producto favorito..."
          className="Input InputSearch"
          id="search"
        />
        <Button type="submit" className="PrimaryWave ButtonSearch">
          <SearchIcon></SearchIcon>
        </Button>
      </form>
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
                (state.filtersCategories.size > 1) || (state.filtersPrice > 1) ? "s" : ""
              }, tienes {
                (state.filtersCategories.size) + Boolean(state.filtersPrice)
              } activo{state.filtersCategories.size > 1 ? "s" : ""}
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
          </div>
        )) : (
          <div className="CategoriesEmpty">
            <EmptyDraw titleEmpty="No hay productos" />
          </div>
        )
      }
    </div>
  );
}

export {
  Search
};
