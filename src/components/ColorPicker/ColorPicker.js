import React, { useState } from "react";
import PropTypes from "prop-types";
import color from "color";
import { BlockPicker, SketchPicker, SliderPicker } from "react-color";
import Popover from "antd/es/popover";
import "antd/es/popover/style";

import {
  inputStyles,
  popupButtonStyles,
  colorPickerContainerStyles,
  colorContainerStyles
} from "../../styles/colorPickerStyles";

const ColorPicker = ({
  enableOpacity,
  initialColor,
  pickerType,
  initialOpacity,
  onColorChange,
  onColorPickerClose
}) => {
  const [colorString, setColorString] = useState(
    color(initialColor)
      .alpha(initialOpacity)
      .rgb()
      .toString()
  );
  const [hexString, setHexString] = useState(
    color(initialColor)
      .rgb()
      .hex()
      .substr(1) || "#000"
  );
  const [opacity, setOpacity] = useState(initialOpacity * 100 || "");
  const [isVisible, setIsVisible] = useState(false);

  const handleColorChange = colorObject => {
    const updatedColorString = colorObject.hex;
    const updatedOpacity = colorObject.rgb.a;
    const prevColorValue = colorString;
    const updatedColorValue = color(updatedColorString)
      .alpha(updatedOpacity)
      .rgb()
      .toString();

    setColorString(
      color(updatedColorString)
        .alpha(updatedOpacity)
        .rgb()
        .toString()
    );
    setHexString(`${updatedColorString.substr(1).toUpperCase()}`);
    setOpacity(updatedOpacity * 100);

    if (prevColorValue !== updatedColorValue) {
      onColorChange(colorObject.hex, colorObject.rgb.a);
    }
  };

  const updatedHexStringField = event => {
    event.target.blur();

    const inputValue =
      event.target.value[0] !== "#"
        ? `#${event.target.value}`
        : event.target.value;
    const prevColorValue = colorString;
    const updatedColorValue = color(inputValue)
      .alpha(opacity)
      .rgb()
      .toString();

    setColorString(updatedColorValue);

    if (prevColorValue !== updatedColorValue) {
      onColorChange(inputValue, opacity);
    }
  };

  const updateOpacityField = event => {
    event.target.blur();

    const inputValue = Number(event.target.value) / 100;
    const updatedColorValue = color(`#${hexString}`)
      .alpha(inputValue)
      .rgb()
      .toString();
    console.log({ updatedColorValue });
    setColorString(updatedColorValue);

    onColorChange(`#${hexString}`, Number(inputValue));
  };

  const renderColorPicker = () => {
    switch (pickerType) {
      case "Block":
        return <BlockPicker onChange={handleColorChange} color={colorString} />;

      case "Slider":
        return (
          <SliderPicker onChange={handleColorChange} color={colorString} />
        );

      default:
        return (
          <SketchPicker onChange={handleColorChange} color={colorString} />
        );
    }
  };

  return (
    <div style={colorPickerContainerStyles()}>
      <span>ColorPicker</span>
      <br />
      <br />
      <div style={colorContainerStyles()}>
        <Popover
          content={renderColorPicker()}
          trigger="click"
          visible={isVisible}
          placement="bottomRight"
          onVisibleChange={visible => {
            setIsVisible(!isVisible);
            onColorPickerClose(hexString, opacity);
          }}
        >
          <button
            style={popupButtonStyles(colorString)}
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          />
        </Popover>
        <input
          style={inputStyles()}
          value={hexString}
          onChange={event => {
            setHexString(event.target.value.toUpperCase());
          }}
          onBlur={updatedHexStringField}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              updatedHexStringField(event);
            }
          }}
        />
        {enableOpacity && (
          <input
            style={inputStyles()}
            type="number"
            min="0"
            max="100"
            value={opacity}
            onChange={event => {
              setOpacity(event.target.value);
            }}
            onBlur={updateOpacityField}
            onKeyDown={event => {
              if (event.keyCode === 13) {
                updateOpacityField(event);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  enableOpacity: PropTypes.bool,
  initialColor: PropTypes.string,
  initialOpacity: PropTypes.number,
  pickerType: PropTypes.string,
  onColorChange: PropTypes.func
};

ColorPicker.defaultProps = {
  enableOpacity: true,
  initialColor: "#000",
  initialOpacity: 1,
  pickerType: "Sketch",
  onColorChange: () => {}
};

export default ColorPicker;
