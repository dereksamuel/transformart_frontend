import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./styles.css";

function Modal(props) {
  const onToggleOverlay = () => {
    const $router = document.getElementById("Router");

    $router.classList.toggle("blur");
  };

  useEffect(() => {
    onToggleOverlay();
  }, []);

  return ReactDOM.createPortal(
    props.children,
    document.getElementById("modal-root")
  );
}

Modal.propTypes = {
  children: PropTypes.any
};

export {
  Modal
};
