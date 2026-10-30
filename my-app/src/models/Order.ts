import { Product } from './Product';

export type Order={
  id: string;
  user_id: string;
  products: Product[];
  payment: number;
  createdAt: Date;
};