import { Product } from '../Types/Product';

export default function addToCart(product: Product): void {
  let list = localStorage.getItem('cart');
  let cart: Product[] = [];

  if (list != null) {
    cart = JSON.parse(list);
  }

  cart.push(product);

  localStorage.setItem('cart', JSON.stringify(cart));
}