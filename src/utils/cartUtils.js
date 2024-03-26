

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
