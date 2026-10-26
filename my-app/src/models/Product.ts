//Products we get using https://fakestoreapi.com/products
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

//products to be inserted into cart
export interface CartProduct extends Product{
  uid: string;
}