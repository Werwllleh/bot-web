import React, { useContext } from "react";
import { SliderContext } from "../../Slider";

const Dot = ({ number }) => {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div
      className={`dot ${slideNumber === number ? "selected" : ""}`}
      onClick={() => goToSlide(number)}
    />
  );
};

export default Dot;
