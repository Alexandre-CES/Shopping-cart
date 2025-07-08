import { useState, useEffect } from "react"
import { Product } from "../../Types/Product";
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import  Header  from '../../Components/Header/header';

export default function Cart(){
    const [products,setProducts] = useState<Product[]>([]);
    const [totalPayment, setTotalPayment] = useState<number>(0);

    //load cart
    useEffect(()=>{
        const list = localStorage.getItem('cart');
        let cart: Product[] = [];

        if(list != null){
            cart = JSON.parse(list);
        }else{
            console.log('error getting products');
        }

        setProducts(cart);
    },[]);

    //calc 
    useEffect(()=>{
        let n = 0;
        for(let product of products){
            n += product.price;
        }
        const rounded: number = Math.round(n * 100) / 100;
        setTotalPayment(rounded);
    },[products]);

    return(
        <div className="container">

            <Header/>
            <nav className="mt-5">
                <ul>
                    <li>
                        <Link to={'/'} className="btn btn-primary"><Icon.ArrowLeftCircle/></Link>
                    </li>
                </ul>
            </nav>
            <main className="mt-5">
                <section id="cart">
                    <div className="row">
                        <div className="col-md-8 order-2 order-md-1 border rounded p-3">
                            <h2 className="mx-3">Products</h2>
                            {
                            products.map((product)=>{
                                return(
                                    <div key={product.id} className="row card m-3">
                                        <div className="row">
                                            <div className="col col-md-4 d-flex align-items-center">
                                                <img src={product.image} className="img-fixed-size img-fluid rounded-start"/>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h2 className="card-title">{product.title}</h2>
                                                    <h3 className="card-text text-success">${product.price}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </div>
                        <div className="col-md-3 order-1 order-md-2 mx-1">
                            <div className="border rounded p-3">
                                <h2>Total</h2>
                                <div className="border p-3 text-center">
                                    <h3 className="text-success">${totalPayment}</h3>    
                                    <button className="btn btn-primary">Payment</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
            
                </section>
            </main>
        </div>
    )
}