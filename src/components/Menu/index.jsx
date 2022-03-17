import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronLeftIcon } from "@heroicons/react/solid";

import { Button } from "../Button";
import LogoTipoSm from "../../assets/images/mobile/LogoTipoSm.svg";

import { auth } from "../../utils/connectFirebase";
import { knowInformationPath } from "../../utils/knowInformationPath";
import "./styles.css";

function Menu() {
  const isAuth = useSelector((state) => state.authenticate.isAuth);
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

  const onLogout = async () => {
    await auth.signOut();
  };

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
    <header className="ContainerMenu">
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
                {
                  !isAuth ? <Link to={{ pathname: state.pathsAction["/login"].to }} className="link-without-styles">
                    <button className="ButtonSecondary">
                      { renderIcon(state.pathsAction["/login"]) }
                      <span>{state.pathsAction["/login"].name}</span>
                    </button>
                  </Link> : (
                    <>
                      <Link to={{ pathname: state.pathsAction["/update_art"].to }} className={
                        history.pathname === state.pathsAction["/update_art"].to ?
                          "Menu-link" :
                          "Menu-link-empty"
                      }>
                        { renderIcon(state.pathsAction["/update_art"]) }
                        <span>{state.pathsAction["/update_art"].name}</span>
                      </Link>
                      <button className="ButtonSecondary" onClick={onLogout}>
                        { renderIcon(state.pathsAction["/register"]) }
                        <span>{state.pathsAction["/register"].name}</span>
                      </button>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </header>
  );
}

export {
  Menu
};
