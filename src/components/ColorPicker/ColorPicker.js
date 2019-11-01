import React, { useState } from "react";
import PropTypes from "prop-types";
import { BlockPicker, SketchPicker, SliderPicker } from "react-color";
import Popover from "antd/es/popover";
import "antd/es/popover/style";

import {
  popupButtonStyles,
  colorPickerContainerStyles
} from "../../styles/colorPickerStyles";

const ColorPicker = ({ enableOpacity, initialColor, pickerType }) => {
  const [hexString, setHexString] = useState(initialColor || "");
  const [isVisible, setIsVisible] = useState(false);

  const handleColorChange = (colorObject, event) => {
    setHexString(colorObject.hex);
  };

  const renderColorPicker = () => {
    switch (pickerType) {
      case "Block":
        return <BlockPicker onChange={handleColorChange} color={hexString} />;

      case "Slider":
        return <SliderPicker onChange={handleColorChange} color={hexString} />;

      default:
        return <SketchPicker onChange={handleColorChange} color={hexString} />;
    }
  };

  return (
    <div style={colorPickerContainerStyles()}>
      <span>ColorPicker</span>
      <br />
      <br />
      <Popover
        content={renderColorPicker()}
        trigger="click"
        visible={isVisible}
        placement="bottomRight"
        onVisibleChange={visible => {
          setIsVisible(!isVisible);
        }}
      >
        <button
          style={popupButtonStyles(hexString)}
          onClick={() => {
            console.log("button clicked");
            setIsVisible(!isVisible);
          }}
        />
      </Popover>
      <br />
      <br />
      <span>Type: {pickerType}</span>
      <br />
      Initial Color: <span>{initialColor}}</span>
      {enableOpacity && <div>Opacity is Enabled</div>}
    </div>
  );
};

ColorPicker.propTypes = {
  enableOpacity: PropTypes.bool,
  initialColor: PropTypes.string,
  pickerType: PropTypes.string
};

ColorPicker.defaultProps = {
  enableOpacity: true,
  initialColor: "#000",
  pickerType: "Sketch"
};

export default ColorPicker;
