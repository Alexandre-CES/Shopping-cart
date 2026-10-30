
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

//products to be inserted into cart
export type CartProduct = Product & {
  amount: number;
}