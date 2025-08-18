import { Product } from '../Types/Product';
import { CartProduct } from '../Types/CartProduct';

function generateId() {
  return crypto.randomUUID();
}

export default async function addToCart(product: Product): Promise<void> {
  try{
    let list = localStorage.getItem('cart');
    let cart: CartProduct[] = [];

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
    
    cart.push(newProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
    return;

  }catch(err){
    throw err;
  }
}