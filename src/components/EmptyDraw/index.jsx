import React from "react";
import PropTypes from "prop-types";

import srcLogoAnimatedEmpty from "../../assets/images/mobile/LogoToAnimateEmpty.svg";

import "./styles.css";

const EmptyDraw = (props) => {
  return (
    <>
      <h2 className="EmptyTitle">{ props.titleEmpty }</h2>
      <div className="relative">
        <svg className="svg" width="165" height="68" viewBox="0 0 165 68" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 25.2746C12.3008 78.2652 49.0678 41.2631 58.146 35.7813C67.2243 30.2996 76.4586 26.6041 84.9269 27.1018C102.107 28.1117 114.445 52.5081 101.268 63.6471C84.6607 77.6851 56.6691 44.4173 62.6852 23.4473C68.6721 2.5791 100.32 -7.14906 114.431 9.28601C124.746 21.2998 126.233 40.8063 118.063 40.8063C108.415 40.8063 105.208 33.4924 110.346 25.2746C115.219 17.4797 123.377 18.023 130.772 23.4473C139.224 29.6467 146.34 49.4432 137.127 44.4608C130.91 41.0988 131.68 36.2382 137.127 30.2995C142.574 24.3609 163 38.979 163 38.979" stroke="white" strokeOpacity="0.87" strokeWidth="2" strokeLinecap="square"/>
        </svg>
        <img src={srcLogoAnimatedEmpty} alt="srcLogoAnimatedEmpty" className="LogoToAnimateEmpty" />
      </div>
    </>
  );
};

EmptyDraw.propTypes = {
  titleEmpty: PropTypes.string
};

export {
  EmptyDraw
};
