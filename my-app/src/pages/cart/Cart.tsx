import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Header from '../../components/header/Header';
import { db } from '../../services/firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';
import { UserData } from '../../models/UserData';
import { CartProduct } from '../../models/Product';
import './cart.css';

export default function CartView() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [user, setUser] = useState<UserData | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(()=>{
    function loadUser(){
      const userDetail = localStorage.getItem('@detailUser');
      if (userDetail) {
        const parsed = JSON.parse(userDetail);
        setUser(parsed);
      }
    }

    function loadCart(){
      const list = localStorage.getItem('cart');
      let cart: CartProduct[] = [];

      if (list != null) {
        cart = JSON.parse(list);
      }

      setCart(cart); 
    }

    loadUser();
    loadCart();
  },[])

  //calc payment, rounding to just two float values
  useEffect(()=>{
    let n = 0;
    for (let product of cart) {
      n += product.price * product.amount;
    }
    const rounded: number = Math.round(n * 100) / 100;
    setTotalPayment(rounded);
  },[cart])

  
  async function purchase() {
    if (cart.length < 1) {
      console.log('Please, insert products in the cart');
      return;
    }

    await addDoc(
      collection(db, 'orders'), {
        user_id: user?.uid,
        products: cart,
        payment: totalPayment,
        createdAt: new Date()
      }
    ).then(() => {
      localStorage.removeItem('cart');
      window.location.reload();
    }).catch((err) => {
      console.log('error during purchase: ' + err);
    })
  }

  
  function getProduct(product_id: number):  CartProduct | null{
    const product: CartProduct | undefined = cart.find(
      (product: CartProduct) => product.id === product_id
    );
    if(!product){
      setMessage('Could not find the product');
      setSuccess(false);
      return null
    }else{
      return product
    }
  }

  //Delete a product from cart
  function deleteFromCart(product_id: number) {
    const product: CartProduct | null = getProduct(product_id)
    if (product){
      const updatedCart = cart.filter((item: CartProduct)=>item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
      setMessage('Product deleted sucessfully');
      setSuccess(true);
    }
  }

  function decreaseAmount(product_id:number){
    const product: CartProduct | null = getProduct(product_id)
    if (product){
      product.amount--
      if(product.amount <=0){
        deleteFromCart(product_id);
      }else{
        localStorage.setItem('cart', JSON.stringify(cart));
        setCart([...cart]);
      }
    }
  }

  function increaseAmount(product_id:number){
    const product: CartProduct | null = getProduct(product_id)
    if (product){
      product.amount++
      localStorage.setItem('cart', JSON.stringify(cart));
      setCart([...cart]);
    }
  }

  return (
    <div>
      <Header />
      <nav className="mt-5 text-center">
        <Link to={'/'} className="btn btn-primary">
          <Icon.ArrowLeftCircle />
        </Link>
      </nav>
      <main className="container mt-5">
        {
          /* alert for removing products to cart */
          message && (
            <div className={`alert ${success ? "alert-success" : "alert-danger"} z-1 position-fixed top-0 start-50 translate-middle-x text-center mt-5`}>
              {message}
            </div>
          )
        }
        <section id="cart" data-bs-theme="dark">
          <div className="row gx-4">
            <div className="col-md-8 order-2 order-md-1">
              <div className="h-100 border rounded bg-surface p-3">
                <h2 className="mx-3 text-light">Products</h2>
                {cart.map((product) => {
                  return (
                    <article key={product.id} className="row card m-3">
                      <div className="row">
                        <div className="col col-md-4 d-flex align-items-center">
                          <img src={product.image} className="img-fixed-size img-fluid rounded-start rounded" alt={product.title}/>
                        </div>
                        <div className="col-md-8">
                          <div className="card-body h-100 d-flex flex-column justify-content-between">
                            <div>
                              <h2 className="card-title">{product.title}</h2>
                              <h3 className="card-text text-success">${product.price}</h3>
                            </div>
                            <div className="d-flex align-items-center justify-content-end">
                              
                              <div className="d-flex">
                                <div className="d-flex align-items-center">
                                  <button className="btn" onClick={()=>decreaseAmount(product.id)}>&lt;</button>
                                  <span>{product.amount}</span>
                                  <button className="btn" onClick={()=>increaseAmount(product.id)}>&gt;</button>
                                </div>
                                <div>
                                  <button
                                    className="btn btn-danger click-transition"
                                    onClick={() => { deleteFromCart(product.id) }}
                                  >
                                    <Icon.TrashFill />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <div className="col-md-4 order-1 order-md-2 mb-3">
              <div className="border rounded p-3 bg-surface">
                <h2 className="text-light mx-1 mb-3">Total</h2>
                <div className="border p-3 text-center">
                  <h3 className="text-success">${totalPayment}</h3>
                  <button onClick={purchase} className="btn btn-primary">Payment</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
