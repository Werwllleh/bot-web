import axios from "axios";

export const getProductsData = async () => {

  return (
    await axios.get(
      'https://script.google.com/macros/s/AKfycbx7u6gMuL62On4vI9xdE51PdfzKkjzhJBm3Fw3ZVJ4tdASNj8MjYOvqifZJrYZl2cqB7A/exec'
    )
  )
};
