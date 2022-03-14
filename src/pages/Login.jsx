import React from "react";

import logoIcon from "../assets/images/mobile/logoIcon.svg";
import WaveFlowHeader from "../assets/images/mobile/WaveFlowHeader.svg";
import WaveFlowFooter from "../assets/images/mobile/WaveFlowFooter.svg";

import { IconBanner } from "../components/IconBanner";
import { Button } from "../components/Button";
import { LoginIcon } from "@heroicons/react/outline";
import { Input } from "../components/Input";
import "./Login.css";
import { useModel } from "../hooks/useModel";

function Login() {
  const [userName, setUserName] = useModel({
    initialValue: "",
    domEl: "#userName"
  });
  const [userPasword, setUserPasword] = useModel({
    initialValue: "",
    domEl: "#userPasword"
  });

  const onLogin = (event) => {
    event.preventDefault();
    console.log([userPasword, setUserPasword]);
    console.log([userName, setUserName]);
  };

  return (
    <div className="Login">
      <img src={WaveFlowHeader} alt="WaveFlowHeader" className="WaveFlowHeader" />
      <form className="FormLogin" onSubmit={onLogin}>
        <IconBanner className="IconBanner logoIcon">
          <img src={logoIcon} alt="logoIcon" />
        </IconBanner>
        <Input
          id="userName"
          className="Input userName"
          placeholder="Nombre de usuario"
        />
        <Input
          id="userPasword"
          className="Input userPasword"
          placeholder="Contraseña"
          type="password"
        />
        <Button type="submit" className="PrimaryWave stylesButtonSignin" onClick={console.log}>
          <div className="sessionContainer">
            <LoginIcon />
            <span>Iniciar sesión</span>
          </div>
        </Button>
      </form>
      <img src={WaveFlowFooter} alt="WaveFlowFooter" className="WaveFlowFooter" />
    </div>
  );
}

export {
  Login
};
