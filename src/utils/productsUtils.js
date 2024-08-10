import axios from "axios";

export const getProductsData = async () => {

  return (
    await axios.get(
      'https://script.google.com/macros/s/AKfycbwTu6m3wl_ZHt1_MHMbdQFi18KsDSCAF-9tz4U_5EclwrUAXy5LiTBCdb9imwvUS7Ev5w/exec'
    )
  )
};
