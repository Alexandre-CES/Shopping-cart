/*
  * This async function receives a Product, then add to the cart, creating a new id for it

  ? use:
    await addToCart(product:Product).then(()=>{
      console.log('success');
    }).catch((err)=>{
      console.error(err);
    })
*/

import { Product, CartProduct } from '../models/Product';

function generateId():string {
  return crypto.randomUUID();
}

export default async function addToCart(product: Product): Promise<void> {
  try{
    let list = localStorage.getItem('cart');
    let cart: CartProduct[] = [];

    /*
      if localStorage already have products, insert into the new cart 
    */
    if (list != null) {
      cart = JSON.parse(list);
    }
    
    //create new Product with unique id
    let newProduct: CartProduct = {
      uid: generateId(),
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    }
    
    //inser new product into the cart
    cart.push(newProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
    return;

  }catch(err){
    throw err;
  }
}