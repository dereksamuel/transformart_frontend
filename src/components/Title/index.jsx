import React from "react";

import PropTypes from "prop-types";
import "./styles.css";

function Title(props) {
  const propsWithoutTitle = {
    ...props
  };
  delete propsWithoutTitle.isTitle;

  return (
    <>
      {
        props.isTitle ?
          <h1 className="Title" {...propsWithoutTitle}>{ props.children }</h1> :
          <h2 className="SubTitle" {...propsWithoutTitle}>{ props.children }</h2>
      }
    </>
  );
}

Title.propTypes = {
  children: PropTypes.any,
  isTitle: PropTypes.bool
};

export {
  Title
};
