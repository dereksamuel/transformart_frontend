import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./styles.css";

function Modal(props) {
  const onToggleOverlay = () => {
    const $root = document.getElementById("root");
    const $router = document.getElementById("Router");
    const $containerMenu = document.getElementById("ContainerMenu");

    $router.classList.toggle("blur");
    $containerMenu.classList.toggle("blur");

    $root.onclick = (event) => {
      event.preventDefault();
    };
  };

  useEffect(() => {
    onToggleOverlay();
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="Overlay"></div>
      { props.children({
        onToggleOverlay
      }) }
    </>,
    document.getElementById("modal-root")
  );
}

Modal.propTypes = {
  children: PropTypes.any
};

export {
  Modal
};
