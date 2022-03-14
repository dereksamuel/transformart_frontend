import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginIcon } from "@heroicons/react/outline";
import { auth } from "../utils/connectFirebase";

import logoIcon from "../assets/images/mobile/logoIcon.svg";
import WaveFlowHeader from "../assets/images/mobile/WaveFlowHeader.svg";
import WaveFlowFooter from "../assets/images/mobile/WaveFlowFooter.svg";

import { IconBanner } from "../components/IconBanner";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useModel } from "../hooks/useModel";

import "./Login.css";

function Login() {
  const [userName] = useModel({
    initialValue: "",
    domEl: "#userName"
  });
  const [userPasword] = useModel({
    initialValue: "",
    domEl: "#userPasword"
  });

  const onLogin = async (event) => {
    event.preventDefault();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userName,
      userPasword
    );

    console.log(userCredential.user.accessToken);
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
          required
        />
        <Input
          id="userPasword"
          className="Input userPasword"
          placeholder="Contraseña"
          type="password"
          required
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
