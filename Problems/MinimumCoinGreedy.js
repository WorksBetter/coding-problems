const getMinCoinCount = (coinArray, amount) => {
  coinArray.sort((a, b) => b - a);
  let count = 0;
  let index = 0;
  while (amount > 0 && index < coinArray.length) {
    if (coinArray[index] <= amount) {
      amount -= coinArray[index];
      count++;
    } else {
      index++;
    }
  }
  return amount > 0 ? -1 : count;
};

console.log("Number of coins: ", getMinCoinCount([5, 10, 25], 3));
