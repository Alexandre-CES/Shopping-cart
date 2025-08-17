import { useState, useEffect } from 'react'
import { Product } from '../../Types/Product';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Header from '../../Components/Header/header';
import { db } from '../../firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';
import { UserData } from '../../Types/UserData';
import './cart.css';
import { CartProduct } from '../../Types/CartProduct';

export default function Cart() {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [user, setUser] = useState<UserData | null>(null);

  // load user
  useEffect(() => {
    const userDetail = localStorage.getItem('@detailUser');
    if (userDetail) {
      const parsed = JSON.parse(userDetail);
      setUser(parsed);
    }
  }, []);

  // load cart
  useEffect(() => {
    const list = localStorage.getItem('cart');
    let cart: CartProduct[] = [];

    if (list != null) {
      cart = JSON.parse(list);
    } else {
      console.log('empty or unavalible list');
    }

    setProducts(cart);
  }, []);

  // calc 
  useEffect(() => {
    let n = 0;
    for (let product of products) {
      n += product.price;
    }
    const rounded: number = Math.round(n * 100) / 100;
    setTotalPayment(rounded);
  }, [products]);

  async function payment() {
    if (products.length < 1) {
      console.log('Please, insert products in the cart');
      return;
    }

    await addDoc(
      collection(db, 'orders'), {
        userId: user?.uid,
        items: products,
        createdAt: new Date()
      }
    ).then(() => {
      localStorage.removeItem('cart');
      window.location.reload();
    }).catch((err) => {
      console.log('error during payment: ' + err);
    })
  }

  function removeFromCart(product: CartProduct) {
        const cartStr:string | null = localStorage.getItem('cart');
        if (cartStr){
            const cart = JSON.parse(cartStr);
            const updatedCart = cart.filter((item:CartProduct) => item.uid !== product.uid);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setProducts(updatedCart);
        }else{
            console.error('could not get the cart');
        }
  }

  return (
    <div className="container bg-dark" data-bs-theme="dark">
      <Header />
      <nav className="mt-5 text-center">
        <Link to={'/'} className="btn btn-primary">
          <Icon.ArrowLeftCircle />
        </Link>
      </nav>
      <main className="mt-5">
        <section id="cart">
          <div className="row">
            <div className="col-md-8 order-2 order-md-1 border rounded p-3">
              <h2 className="mx-3 text-light">Products</h2>
              {products.map((product) => {
                return (
                  <div key={product.uid} className="row card m-3">
                    <div className="row">
                      <div className="col col-md-4 d-flex align-items-center">
                        <img src={product.image} className="img-fixed-size img-fluid rounded-start rounded" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h2 className="card-title">{product.title}</h2>
                          <div className="d-flex align-items-center justify-content-between">
                            <h3 className="card-text text-success">${product.price}</h3>
                            <button
                              className="btn btn-danger click-transition"
                              onClick={() => { removeFromCart(product) }}
                            >
                              <Icon.TrashFill />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-4 order-1 order-md-2 mb-3">
              <div className="border rounded p-3">
                <h2 className="text-light mx-1 mb-3">Total</h2>
                <div className="border p-3 text-center">
                  <h3 className="text-success">${totalPayment}</h3>
                  <button onClick={payment} className="btn btn-primary">Payment</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
