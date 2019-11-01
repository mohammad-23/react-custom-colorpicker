import "../../styles/popupStyles.css";
import React from "react";
import PropTypes from "prop-types";

const popupStyles = (display, position) => {
  return {
    visibility: "hidden",
    width: "160px",
    backgroundColor: "#555",
    color: "#fff",
    textAlign: "center",
    borderRadius: "6px",
    padding: "8px 0",
    position: "absolute",
    zIndex: "1",
    marginLeft: "-80px"
  };
};

const Popup = ({ title, content, display, position }) => {
  return (
    <div
      className="popup"
      onClick={() => {
        const popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      }}
    >
      {title}
      <span
        className="popuptext"
        id="myPopup"
        style={{ [position || "top"]: "125%", [display || "left"]: "150%" }}
      >
        {content}
      </span>
    </div>
  );
};

Popup.propTypes = {
  title: PropTypes.any.isRequired,
  content: PropTypes.node.isRequired
};

export default Popup;
