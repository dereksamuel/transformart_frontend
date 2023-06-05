import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import logoIcon from "../../assets/images/mobile/logoIcon.svg";
import loginSrcPlan from "../../assets/images/pc/Plan.png";
import WaveFlowHeader from "../../assets/images/mobile/WaveFlowHeader.svg";

import { useVerifyAuth } from "../../hooks/useVerifyAuth";

import { IconBanner } from "../../components/IconBanner";
import { Alert } from "../../components/Alert";
import { LoginForm } from "../../components/LoginForm";

import "./styles.css";
import "./login-media-queries.css";

function Login() {
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const navigate = useNavigate();
  useVerifyAuth();

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

  useEffect(() => {
    if (isAuth) {
      navigate({ pathname: "/update_art" });
    }
  }, [isAuth]);

  return (
    <div className="Login page">
      <img src={WaveFlowHeader} alt="WaveFlowHeader" className="WaveFlowHeader" />
      {
        stateLocal.showAlert && <Alert
          description="Lo sentimos, pero algo ha ido mal con la autenticación"
          theme="Error"
          toLeft={true}
          onClick={onHideAlert}
        />
      }
      <div className="LabelMain">
        <div className="PC__ContainerHero">
          <h3><strong>Gestiona</strong> el</h3>
          <h3>aplicativo a tu</h3>
          <h3>antojo</h3>
          <img src={loginSrcPlan} alt="loginSrcPlan" />
        </div>
      </div>
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
