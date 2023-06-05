import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, DotsHorizontalIcon } from "@heroicons/react/solid";

import { Button } from "../Button";

import LogoTipoSm from "../../assets/images/mobile/LogoTipoSm.svg";

import { logout } from "../../store/actions/authenticate";

import { knowInformationPath } from "../../utils/knowInformationPath";
import { auth } from "../../utils/connectFirebase";

import "./styles.css";

function Menu() {
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const location = useLocation();
  const $button = useRef(null);
  const $menu = useRef(null);
  const [state, setState] = useState({
    isMenuDisplayed: false,
    informationPage: null,
    pathsInfo: {},
    pathsAction: {},
    isNotShowedDesc: false,
    showDots: false
  });
  const $overlayDots = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onShowMenu = (val) => {
    const $router = document.getElementById("Router");

    $button.current.classList.toggle("rotate360");
    $router.classList.toggle("blur");

    $menu.current.classList.toggle("Menu-hide");

    setState({
      ...state,
      isMenuDisplayed: val || !state.isMenuDisplayed
    });
  };

  const renderIcon = (valuePage) => {
    return location.pathname === valuePage.to && <span className="IconMenuLink">{valuePage.icon}</span>;
  };

  const onLogout = async () => {
    await auth.signOut();
    await dispatch(logout());

    navigate({ pathname: "/login" });
  };

  const onShowDots = (event) => {
    event.stopPropagation();
    $overlayDots.current.classList.toggle("OverlayDotsDefault");
    $overlayDots.current.classList.toggle("OverlayDots");

    setState({
      ...state,
      showDots: !state.showDots
    });
  };

  const pcUnderline = (valuePage) => location.pathname === valuePage.to && <span className="pc-Underline"></span>;

  const menuActions = (isPc) => {
    const updateArtLink = (updateArtUnderline) => (
      <Link to={{ pathname: state.pathsAction["/update_art"].to }} className={
        location.pathname === state.pathsAction["/update_art"].to ?
          "Menu-link" :
          "Menu-link-empty"
      }>
        { renderIcon(state.pathsAction["/update_art"]) }
        <span>{state.pathsAction["/update_art"].name}</span>
        { updateArtUnderline && pcUnderline(state.pathsAction["/update_art"]) }
      </Link>
    );

    return (
      <div className={isPc ? "ContainerActions PCActions" : "ContainerActions"}>
        <div ref={$overlayDots} className="OverlayDots"></div>
        {
          !isAuth ? <Link to={{ pathname: state.pathsAction["/login"].to }} className="link-without-styles Button-link-Menu">
            <button className="ButtonSecondary">
              { renderIcon(state.pathsAction["/login"]) }
              <span>{state.pathsAction["/login"].name}</span>
              { pcUnderline(state.pathsAction["/login"]) }
            </button>
          </Link> : (
            <>
              { updateArtLink(true) }
              <button className="ButtonSecondary" onClick={onLogout}>
                { renderIcon(state.pathsAction["/register"]) }
                <span>{state.pathsAction["/register"].name}</span>
                { pcUnderline(state.pathsAction["/register"]) }
              </button>
            </>
          )
        }
        {
          isPc && (
            <button onClick={onShowDots} className="Dots button-without-styles">
              <DotsHorizontalIcon />
            </button>
          )
        }
        {
          (state.showDots && isPc) && (
            <div className="DotsContainer" onClick={(event) => event.stopPropagation()}>
              {/* <Link to={{ pathname: state.pathsAction["/my_own_art"].to }} className={
                location.pathname === state.pathsAction["/my_own_art"].to ?
                  "Menu-link" :
                  "Menu-link-empty"
              }>
                { renderIcon(state.pathsAction["/my_own_art"]) }
                <span>{state.pathsAction["/my_own_art"].name}</span> */}
              {/* { pcUnderline(state.pathsAction["/my_own_art"]) } */}
              {/* </Link> */}
              { updateArtLink() }
            </div>
          )
        }
      </div>
    );
  };

  useEffect(() => {
    const eventHandler = () => {
      $overlayDots.current.classList.toggle("OverlayDotsDefault");
      $overlayDots.current.classList.toggle("OverlayDots");

      setState({
        ...state,
        showDots: false
      });
    };

    const startEventCloseMenu = () => {
      window.addEventListener("click", eventHandler);
    };

    if (state.showDots) {
      startEventCloseMenu();
    }

    return () => {
      window.removeEventListener("click", eventHandler);
    };
  }, [state.showDots]);

  useEffect(() => {
    const { pathsInfo, onlyPath, pathsAction, isNotShowedDesc } = knowInformationPath(location.pathname);

    setState({
      ...state,
      informationPage: onlyPath,
      pathsInfo,
      pathsAction,
      isNotShowedDesc
    });
  }, [location.pathname]);

  // FIXME: Fix the problem with TO and the pathname

  return (
    <header className="ContainerMenu" id="ContainerMenu">
      <Button refel={$button} onClick={onShowMenu} className="ButtonMenu" aria-label="ButtonMenu">
        <ChevronLeftIcon />
      </Button>
      <div className="Menu Menu-hide" ref={$menu}>
        <img src={LogoTipoSm} alt="LogoTipoSm" className="LogoTipoSm" />
        <div className="ContainerGeneralLinks">
          <div className="ContainerLinks">
            {
              Object.values(state.pathsInfo).map((valuePage, index) => (
                <Link to={{ pathname: valuePage.to }} className={
                  location.pathname === valuePage.to ? "Menu-link" : "Menu-link-empty"
                } key={index}>
                  { renderIcon(valuePage) }
                  <span>{valuePage.name}</span>
                  { pcUnderline(valuePage) }
                </Link>
              ))
            }
          </div>
          {
            state.informationPage && menuActions()
          }
        </div>
        {
          state.informationPage && menuActions(true)
        }
        {
          (state.informationPage && state.isNotShowedDesc) && (
            <div className="ContainerDesc">
              <p>{ state.informationPage.description }</p>
              { state.informationPage.img }
            </div>
          )
        }
      </div>
      {
        state.showDots && (
          <div className="ModalOverlayDots"></div>
        )
      }
    </header>
  );
}

export {
  Menu
};
