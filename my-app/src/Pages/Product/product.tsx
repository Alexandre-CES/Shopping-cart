import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../../Types/Product";
import * as Icon from 'react-bootstrap-icons';

export default function ProductView(){
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();

    useEffect(()=>{
            async function loadProducts(){
                const productData = await fetch(`https://fakestoreapi.com/products/${id}`)
                .then(res=>res.json())
                .catch((err)=>console.log('Error fething data: '+err));
    
                setProduct(productData);
            }
    
            loadProducts();
    },[]);

    function addToCart(product:Product):void{
        const list = localStorage.getItem('cart');
        let cart: Product[] = [];

        if (list != null){
            cart = JSON.parse(list);
        }
        
        cart.push(product);

        localStorage.setItem('cart',JSON.stringify(cart));
  }

    return(
        <main id="product-main" className="container mt-5">

            <div className="row my-5 align-items-center">
                <div className="col">
                    <img className="img-fixed-size img-fluid img-thumbnail rounded" src={product?.image}/>
                </div>
                <div className="col d-grid gap-2">
                    <h2>{product?.title}</h2>
                    <h3 className="text-success fw-bold">{product?.price}$</h3>
                    <button className='btn btn-primary w-100' onClick={()=>{
                        if(product != undefined){
                            addToCart(product);
                        }else{
                            console.log('undefined product');
                        }
                    }}><Icon.Cart2/></button>
                </div>
            </div>
            <div className="row">
                <h2>Description</h2>
                <p>{product?.description}</p>
            </div>
   
        </main>
    );
}