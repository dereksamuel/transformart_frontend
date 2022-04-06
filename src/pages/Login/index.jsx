import React, { useState } from "react";

import logoIcon from "../../assets/images/mobile/logoIcon.svg";
import WaveFlowHeader from "../../assets/images/mobile/WaveFlowHeader.svg";

import { IconBanner } from "../../components/IconBanner";
import { Alert } from "../../components/Alert";

import "./styles.css";
import { LoginForm } from "../../components/LoginForm";

function Login() {
  const [stateLocal, setStateLocal] = useState({
    showAlert: false
  });

  const onHideAlert = () => setStateLocal({
    ...stateLocal,
    showAlert: false
  });

  const onErrorFormLogin = () => {
    setStateLocal({
      ...stateLocal,
      showAlert: true
    });
  };

  return (
    <div className="Login">
      <img src={WaveFlowHeader} alt="WaveFlowHeader" className="WaveFlowHeader" />
      {
        stateLocal.showAlert && <Alert
          description="Lo sentimos, pero algo ha ido mal con la autenticación"
          theme="Error"
          toLeft={true}
          onClick={onHideAlert}
        />
      }
      <div className="FormLogin">
        <IconBanner className="IconBanner logoIcon">
          <img src={logoIcon} alt="logoIcon" />
        </IconBanner>
        <LoginForm onError={onErrorFormLogin} />
      </div>
    </div>
  );
}

export {
  Login
};
