/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and returns a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let objects = {};

  // for(let transaction of transactions) {
  //   const category = transaction.category;
  //   objects[category] = 0;
  // }

  // for(let transaction of transactions) {
  //   const category = transaction.category;
  //   const price = transaction.price;
  //   objects[category] += price;
  // }

  for(let i = 0; i < transactions.length; i++) {
    const category = transactions[i].category;
    if(!objects[category])
      objects[category] = 0;

    const price = transactions[i].price;
    objects[category] += price;
  }

  const res = Object.keys(objects).map(category => {
    return {category, totalSpent: objects[category]};
  });

  return res;
}

module.exports = calculateTotalSpentByCategory;
