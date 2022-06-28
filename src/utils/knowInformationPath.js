import React from "react";
import { HomeIcon, CurrencyDollarIcon, PhotographIcon, PencilIcon, LoginIcon } from "@heroicons/react/outline";

import srcHome from "../assets/images/mobile/HomeInfo.svg";
import srcMyShoppingInfo from "../assets/images/mobile/MyShoppingInfo.svg";
import srcProductsInfo from "../assets/images/mobile/ProductsInfo.svg";
import srcUpdateArtInfo from "../assets/images/mobile/UpdateArtInfo.svg";
import srcLoginInfo from "../assets/images/mobile/LoginInfo.svg";

function knowInformationPath(pathname) {
  const pathsInfo = {
    "/": {
      name: "Inicio",
      description: "En esta sección podrás encontrar información de nosotros y podrás ver más de nuestros productos",
      img: <img src={srcHome} alt="srcHome" className="imgInformative srcHome" />,
      icon: <HomeIcon />,
      to: "/"
    },
    "/products": {
      name: "Productos",
      description: "Tenemos lo mejor de arte, cuadros, artesanias, etc... ¡No te prives de algo que podría cambiar tu estilo de vida!",
      img: <img src={srcProductsInfo} alt="srcProductsInfo" className="imgInformative srcProductsInfo" />,
      icon: <PhotographIcon />,
      to: "/products"
    },
    "/myshopping": {
      name: "Mis Compras",
      description: "Disfruta que en esta sección podrás agregar varios productos a tu carrito",
      img: <img src={srcMyShoppingInfo} alt="srcMyShoppingInfo" className="imgInformative srcMyShoppingInfo" />,
      icon: <CurrencyDollarIcon />,
      to: "/myshopping"
    }
  };

  const pathsAction = {
    "/update_art": {
      name: "Actualizar arte",
      description: "Edita el aplicativo a tu antojo, si tienes alguna duda escribe a dereksamuelgr",
      img: <img src={srcUpdateArtInfo} alt="srcUpdateArtInfo" className="imgInformative srcUpdateArtInfo sectionTwo" />,
      icon: <PencilIcon />,
      to: "/update_art"
    },
    "/login": {
      name: "Inicio de sesión",
      description: "En esta sección solo pueden acceder usuarios autorizados por transformArt.",
      img: <img src={srcLoginInfo} alt="srcLoginInfo" className="imgInformative srcLoginInfo sectionTwo" />,
      icon: <LoginIcon />,
      typeButton: true,
      to: "/login"
    },
    "/my_own_art": {
      name: "Crea tu obra de arte",
      description: "En esta sección puedes crear tu arte favorito con nuestra IA llamada Piggy",
      img: <img src={srcLoginInfo} alt="srcLoginInfo" className="imgInformative srcLoginInfo sectionTwo" />,
      icon: <LoginIcon />,
      typeButton: true,
      to: "/my_own_art"
    }
  };

  pathsAction["/register"] = {
    ...pathsAction["/login"],
    name: "Cerrar sesión"
  };

  return {
    pathsInfo,
    pathsAction,
    onlyPath: pathsInfo[pathname] || pathsAction[pathname] || pathsAction["/login"],
    isNotShowedDesc: Boolean(pathsInfo[pathname] || pathsAction[pathname])
  };
}

export {
  knowInformationPath
};
