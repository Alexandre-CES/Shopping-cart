import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../../Types/Product";

export default function ProductView(){
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();

    useEffect(()=>{
            async function loadProducts(){
                const productData = await fetch(`https://fakestoreapi.com/products/${id}`)
                .then(res=>res.json())
                .catch((err)=>console.log('Error fething data: '+err))
    
                setProduct(productData);
            }
    
            loadProducts();
    },[]);

    return(
        <main>
            
            {product?.id}
            {product?.title}
            {product?.price}
            
            <img src={product?.image}/>

        </main>
    );
}