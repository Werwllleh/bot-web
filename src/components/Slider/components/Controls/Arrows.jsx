import React, { useContext } from "react";

import { SliderContext } from "../../Slider";

import "../../Slider.css";

const Arrows = () => {
  const { changeSlide } = useContext(SliderContext);

  return (
    <div className="arrows">
      <div className="arrow left" onClick={() => changeSlide(-1)} />
      <div className="arrow right" onClick={() => changeSlide(1)} />
    </div>
  );
};

export default Arrows;
