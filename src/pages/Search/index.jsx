import React, { useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
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

function Search() {
  const [search] = useModel({
    initialValue: "",
    domEl: "#search"
  });

  const categories = useSelector((state) => state.categories.all);
  const [state, setState] = useState({
    filters: new Set()
  });

  const dispatch = useDispatch();
  useCP();

  const onChangeFilter = (value, type) => {
    const newFiltersSetter = new Set(state.filters);

    if (type === "delete")
      newFiltersSetter.delete(value);
    else newFiltersSetter.add(value);

    setState({
      ...state,
      filters: newFiltersSetter
    });
  };

  const onSearch = (event) => {
    event.preventDefault();

    console.log(search); // TODO: IS PENDING

    const queriesArray = [];

    for (const filter of state.filters) {
      queriesArray.push({
        categoriesId: {
          $eq: filter
        }
      });
    }

    dispatch(
      getCategoriesProducts({
        where: {
          $or: queriesArray
        }
      })
    );
  };

  return (
    <div className="Search">
      <Title className="SubTitle TitleButterFly" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Buscar</span>
      </Title>
      <form className="SearchForm" onSubmit={onSearch}>
        <Input
          placeholder="Busca tu arte favorito..."
          className="Input"
          id="search"
        />
        <Button type="submit" className="PrimaryWave ButtonSearch">
          <SearchIcon></SearchIcon>
        </Button>
      </form>
      <div className="BannerContainer">
        {
          (categories && categories.length) && categories.map((category, indexCategory) => (
            <li
              key={indexCategory}
              className={
                `BannerLi ${state.filters.has(category.id) && "SelectedBanner"}`
              }
            >
              <Banner>
                {
                  state.filters.has(category.id) && (
                    <XIcon
                      className="Icon"
                      onClick={() => onChangeFilter(category.id, "delete")}
                    />
                  )
                }
                <span
                  className="Text"
                  onClick={() => onChangeFilter(category.id, "add")}
                >{category.name}</span>
              </Banner>
            </li>
          ))
        }
      </div>
      <div className="CategoriesEmpty ContainerProducts">
        <EmptyDraw titleEmpty="Busca algún producto y aquí aprecerá" />
      </div>
    </div>
  );
}

export {
  Search
};
