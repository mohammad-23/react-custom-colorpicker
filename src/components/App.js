import React from "react";
import ColorPicker from "./ColorPicker/ColorPicker";

const App = () => {
  return (
    <ColorPicker
      enableOpacity
      initialColor="#ff33"
      pickerType="Sketch"
      initialOpacity={0.2}
      onColorChange={(color, alpha) => {}}
      onColorPickerClose={(that, opacity) => {}}
    />
  );
};

export default App;
