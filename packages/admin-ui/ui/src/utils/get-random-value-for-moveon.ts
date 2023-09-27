export function getRandomValueForMoveonInventory() {
  const ecommerceKeywords = [
    "Shoes",
    "Clothing",
    "Electronics",
    "Accessories",
    "Toys",
    "Jewelry",
    "Home Decor",
    "Sports Equipment",
    "Beauty Products",
    "Books"
  ];

  const randomIndex = Math.floor(Math.random() * ecommerceKeywords.length);

  return ecommerceKeywords[randomIndex];
}