import { useState, useEffect } from "react"
import { Product } from "../../Types/Product";

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
        setTotalPayment(n);
    },[products]);

    return(
        <div className="container">
            <main className="mt-5">
                <section id="cart">
                    <div className="row">
                        <div className="col">
                        {
                            products.map((product)=>{
                                return(
                                    <div key={product.id} className="row card mb-3">
                                        <div className="row">
                                            <div className="col col-md-4">
                                                <img src={product.image} className="img-fluid rounded-start"/>
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
                        <div className="col">
                            <h2>Total</h2>
                            <h3 className="text-success">${totalPayment}</h3>    
                            <button className="btn btn-primary">Payment</button>
                        </div>
                    </div>
            
                </section>
            </main>
        </div>
    )
}