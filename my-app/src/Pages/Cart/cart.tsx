import { useState, useEffect } from "react"
import { Product } from "../../Types/Product";

export default function Cart(){
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(()=>{

        //load cart
        function loadCart(){
            const list = localStorage.getItem('cart');
            let cart: Product[] = [];

            if(list != null){
                cart = JSON.parse(list);
            }else{
                console.log('error getting products');
            }

            setProducts(cart);
        }

        loadCart();
    },[]);

    return(
        <main>
            <section>
                {
                    products.map((product)=>{
                        return(
                            <div key={product.id}>
                                {product.title}
                            </div>
                        );
                    })
                }
            </section>
        </main>
    )
}