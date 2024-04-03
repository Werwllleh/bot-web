

export const getTotalSumCart = (cart) => {
  return cart.reduce((cartSum, item) => {
    cartSum.totalSum += item.price * item.count;
    cartSum.totalCount += item.count;
    return cartSum;
  }, {
    totalSum: 0,
    totalCount: 0
  });
}

export const checkAvailable = (availableProducts, currentCart, selectedPlace) => {
  if (currentCart.length && selectedPlace) {
    let filtered = availableProducts.filter((info) => info.value === selectedPlace);
    return currentCart.every(item => filtered[0].products[item.id] >= item.count)
  }
}
