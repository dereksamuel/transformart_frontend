import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Button } from "../Button";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import LogoTipoSm from "../../assets/images/mobile/LogoTipoSm.svg";

import "./styles.css";
import { knowInformationPath } from "../../utils/knowInformationPath";
import { Link } from "react-router-dom";

function Menu() {
  const history = useLocation();
  const $button = useRef(null);
  const [state, setState] = useState({
    isMenuDisplayed: false,
    informationPage: null,
    pathsInfo: {},
    pathsAction: {}
  });

  const onShowMenu = () => {
    const $router = document.getElementById("Router");

    $button.current.classList.toggle("rotate360");
    $router.classList.toggle("blur");

    setState({
      ...state,
      isMenuDisplayed: !state.isMenuDisplayed
    });
  };

  const renderIcon = (valuePage) => {
    return history.pathname === valuePage.to && <span className="IconMenuLink">{valuePage.icon}</span>;
  };

  // anime.setDashoffset(["0%", "100%"]);

  useEffect(() => {
    const { pathsInfo, onlyPath, pathsAction } = knowInformationPath(history.pathname);

    setState({
      ...state,
      informationPage: onlyPath,
      pathsInfo,
      pathsAction
    });
  }, [history.pathname]);

  return (
    <div className="ContainerMenu">
      <Button refel={$button} onClick={onShowMenu} className="ButtonMenu" aria-label="ButtonMenu">
        <ChevronLeftIcon />
      </Button>
      {
        state.isMenuDisplayed && (
          <div className="Menu">
            <img src={LogoTipoSm} alt="LogoTipoSm" className="LogoTipoSm" />
            <div className="ContainerDesc">
              <p>{state.informationPage.description}</p>
              {state.informationPage.img}
            </div>
            <div className="ContainerGeneralLinks">
              <div className="ContainerLinks">
                {
                  Object.values(state.pathsInfo).map((valuePage, index) => (
                    <Link to={{ pathname: valuePage.to }} className={
                      history.pathname === valuePage.to ? "Menu-link" : "Menu-link-empty"
                    } key={index}>
                      { renderIcon(valuePage) }
                      <span>{valuePage.name}</span>
                    </Link>
                  ))
                }
              </div>
              <div className="ContainerActions">
                <Link to={{ pathname: state.pathsAction["/update_art"].to }} className={
                  history.pathname === state.pathsAction["/update_art"].to ?
                    "Menu-link" :
                    "Menu-link-empty"
                }>
                  { renderIcon(state.pathsAction["/update_art"]) }
                  <span>{state.pathsAction["/update_art"].name}</span>
                </Link>
                <Link to={{ pathname: state.pathsAction["/login"].to }} className="link-without-styles">
                  <button className="ButtonSecondary">
                    { renderIcon(state.pathsAction["/login"]) }
                    <span>{state.pathsAction["/login"].name}</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export {
  Menu
};
