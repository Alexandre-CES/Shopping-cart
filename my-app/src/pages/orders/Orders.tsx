import { useState, useEffect } from 'react';
import { Order } from '../../models/Order';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Header from '../../components/header/Header';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { UserData } from '../../models/UserData';
import { CartProduct } from '../../models/Product';
import './orders.css';

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(()=>{
    const userDetail = localStorage.getItem('@detailUser');
    if (userDetail) {
      const parsed = JSON.parse(userDetail);
      setUser(parsed);
    }
  },[])

  useEffect(() => {
    if (!user) return;

    const ordersQuery = query(
      collection(db, 'orders'),
      where('user_id', '==', user.uid)
    );

    getDocs(ordersQuery).then((snapshot) => {
      const ordersList = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          user_id: data.user_id,
          products: data.products,
          payment: data.payment,
          createdAt: data.createdAt.toDate()
        };
      });

      setOrders(ordersList);
    });
  }, [user]);


  return(
    <div>
      <Header />
      <nav className="mt-5 text-center">
        <Link to={'/'} className="btn btn-primary">
          <Icon.ArrowLeftCircle />
        </Link>
      </nav>
      <main className="container mt-5">
        <section id="orders" className="m-auto" data-bs-theme="dark">
          {orders.map((order) => {
            return(
              <article key={order.id} className="col py-2 my-5 px-3 border rounded bg-surface">
                <div className="d-flex flex-row justify-content-between align-items-center border-bottom">
                  <h2 className="text-light">Order: {order.id}</h2>
                </div>
                <div className="mt-3">
                  <h3 className="text-light fs-5">Details:</h3>
                </div>
                <div>
                  <div className="d-flex flex-row px-3 text-muted">
                    <p className="my-0">- Total Payment:</p>
                    <p className="my-0 mx-1 text-success">{order.payment}</p>
                  </div>
                  <div className="d-flex flex-row px-3 text-muted">
                    <p className="my-0">- Status: </p>
                    <p className="text-warning mx-1 my-0">In travel</p>
                  </div>
                  <div className="d-flex flex-row px-3 text-muted">
                    <p className="my-0">- Date of payment:</p>
                    <p className="my-0 mx-1">{(order.createdAt).toString()}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-light fs-5">Products:</h3>
                </div>
                <div>
                  {(order.products as CartProduct[]).map((product)=>{
                    return(
                      <div className="d-flex flex-row justify-content-between align-items-end mb-3 py-1 px-3 border rounded text-muted ">
                        <div className="d-flex flex-row align-items-center">
                          <div className="orders-product-image-box d-flex align-items-center">
                            <img src={product.image} alt={product.title} className="img-fixed-size img-fluid rounded-start rounded"/>
                          </div>
                          <div>
                            <p className="my-0">{product.title}</p>
                            <p className="my-0 text-success">${product.price}</p>
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <p>Amount:</p>
                          <p>{product.amount}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </section>
      </main>
    </div>
  )
}