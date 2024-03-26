
export const getTotalSumCart = (cart) => {

  let cartSum = {
    totalSum: 0,
    totalCount: 0
  }

  cart.map((item) => {
    cartSum.totalSum += item['price'];
    cartSum.totalCount += item['count'];
  })

  return cartSum;

}
