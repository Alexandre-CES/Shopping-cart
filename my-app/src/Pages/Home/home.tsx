import { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';
import { UserData } from '../../Types/UserData';
import * as Icon from 'react-bootstrap-icons';
import { Link,useNavigate } from 'react-router-dom';

export default function Home(){
  const [products,setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  
  useEffect(()=>{

    //store userData
    function loadUser(){
      const userDetail = localStorage.getItem('@detailUser');
      if(userDetail){
        const parsed = JSON.parse(userDetail);
        setUser(parsed);
      }else{
        navigate('/login');
      }
    }

    //fetch data and load products
    async function loadProducts(){
      const productsData = await fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .catch((err)=>console.log('Error fething data: '+err))

      setProducts(productsData);
    }

    loadUser();
    loadProducts();
  },[]);

  function addToCart(product:Product):void{
    let list = localStorage.getItem('cart');
    let cart: Product[] = [];

    if (list != null){
      cart = JSON.parse(list);
    }
    
    cart.push(product);

    localStorage.setItem('cart',JSON.stringify(cart));
  }

  function logout(){
    console.log('logout');
  }

  return (
    <div className='container'>
      <header className='d-flex py-3'>
        <div className='col justify-content-center'>
          <h1>Shopping Cart <Icon.Cart2/></h1>
        </div>
        <div className='d-flex flex-row-reverse'>
          <button onClick={logout} className='btn btn-secondary'>Logout</button>
          <p>{user?.email}</p>
        </div>
        
      </header>
      <main>
        <section className='container mt-5'>
          <div className='row justify-content-center'>
            {
              products.map((product)=>{
                return(
                  <div key={product.id} className='col-md-4 mb-4'>
                      <div className='card'>
                          
                          <img className='img-fixed-size img-fluid w-100 img-thumbnail rounded' src={product.image}/>
                          
                          <div className='card-body'>
                              <h3 className='card-title'>{product.price}$</h3>
                              <p className="card-text">{product.title}</p>
                              <Link to={'/product/'+product.id} target='_blank' className="card-link text-secondary">More</Link>
                              <button className='btn btn-primary mx-2' onClick={()=>addToCart(product)}><Icon.Cart2/></button>
                          </div>
                      </div>
                  </div>
                );
              })
            }
          </div>
        </section>
      </main>
    </div>
  );
}