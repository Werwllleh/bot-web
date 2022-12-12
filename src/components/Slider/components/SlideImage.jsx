import React from "react";

import "./../Slider.css";

const SlideImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="slide-image" />;
};

export default SlideImage;
