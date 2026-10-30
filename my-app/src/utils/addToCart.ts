import { CartProduct } from '../models/Product';

export default async function addToCart(product_id: number): Promise<void> {
  try{
    let list = localStorage.getItem('cart');
    let cart: CartProduct[] = [];

    if (list != null) {
      cart = JSON.parse(list);
    }
    
    const product: CartProduct | undefined = cart.find(product => product.id === product_id);

    if(!product){
      const productData = await fetch(`https://dummyjson.com/products/${product_id}`)
        .then(res => res.json())
        .catch((err) => {throw err})
      const newCartProduct = {
        id: productData.id,
        title: productData.title,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        image: productData.thumbnail,
        amount: 1
      }
      cart.push(newCartProduct);
    }else{
      product.amount += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

  }catch(err){
    throw err;
  }
}