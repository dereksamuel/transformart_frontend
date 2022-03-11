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
    pathsInfo: []
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

  // anime.setDashoffset(["0%", "100%"]);

  useEffect(() => {
    const { pathsInfo, onlyPath } = knowInformationPath(history.pathname);

    setState({
      ...state,
      informationPage: onlyPath,
      pathsInfo
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
            <div className="ContainerLinks">
              {
                Object.values(state.pathsInfo).map((valuePage, index) => (
                  <Link to={{ pathname: valuePage.to }} className={
                    history.pathname === valuePage.to ? "Menu-link" : "Menu-link-empty"
                  } key={index}>
                    {
                      history.pathname === valuePage.to && <span className="IconMenuLink">{valuePage.icon}</span>
                    }
                    <span>{valuePage.name}</span>
                  </Link>
                ))
              }
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
