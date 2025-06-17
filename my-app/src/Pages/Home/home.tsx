import React, { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';
import * as Icon from 'react-bootstrap-icons';

export default function Home(){
    const [products,setProducts] = useState<Product[]>([]);

    //fetch data and load products everytime page is loaded
    useEffect(()=>{
        async function loadProducts(){
            const productsData = await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .catch((err)=>console.log('Error fething data: '+err))

            setProducts(productsData);
        }

        loadProducts();
    },[]);

  return (
    <main>
      <section className='container mt-5'>
        <div className='row justify-content-center'>
          {
            products.map((product)=>{
              return(
                <div className='col-md-4 mb-4'>
                    <div className='card'>
                        <img src={product.image}/>
                        <div className='card-body'>
                            <h3 className='card-title'>{product.price}$</h3>
                            <p className="card-text">{product.title}</p>
                            <a href="#" className="card-link">More</a>
                            <button className='btn btn-primary'><Icon.Cart2/></button>
                        </div>
                    </div>
                </div>
              );
            })
          }
        </div>
      </section>
    </main>
  );
}