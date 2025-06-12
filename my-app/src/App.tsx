import React, { useEffect, useState } from 'react';
import { Product } from './Types/Product';

function App() {
  const [products,setProducts] = useState<Product[]>([]);

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


      <ul>
      {
        /*   
        products.map((product)=>{
          return(
            <li key={product.id}>
              <div>
                {product.id};
              </div>
              <div>
                {product.price};
              </div>
              <div>
                {product.description};
              </div>
              <div>
                {product.category};
              </div>
              <div>
                {product.image};
              </div>
            </li>
          );
        })
        */ 
      }
      </ul>
    </main>
  );
}

export default App;
