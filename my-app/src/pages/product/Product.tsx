import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { Product } from '../../models/Product';
import addToCart from '../../utils/addToCart';
import Header from '../../components/header/Header';
import './product.css';

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const productData = await fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .catch((err) => 
          console.log('Error fething data: ' + err));
        
      const newProduct: Product = {
        id : productData.id,
        title: productData.title,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        image: productData.thumbnail
      }

      setProduct(newProduct)
    }
    loadProduct();
  }, [id]);

  //call addToCart function and shows result at screen
  async function handleAdd(product: Product) {
    await addToCart(product.id).then(()=>{
      setMessage(`${product.title} Added to cart ✅`);
      setSuccess(true);
    }).catch((err)=>{
      setMessage(`Error adding ${product.title}: `+err);
      setSuccess(false);
    })
    
    //reset timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    //timer to remove message
    timeoutRef.current = setTimeout(() => setMessage(null), 3000);
  }

  if (!product) {
    return null;
  }else{
    return (
      <div>
        <Header/>

        <nav className="mt-5 text-center">
          <Link to={'/'} className="btn btn-primary">
            <Icon.ArrowLeftCircle />
          </Link>
        </nav>
        <main id="product-main" className="container mt-1 mt-md-5 mb-5">

          {
          /* alert for adding products to cart */
          message && (
            <div 
              className={
                `alert ${success ? "alert-success" : "alert-danger"} 
                z-1 position-fixed top-0 start-50 translate-middle-x text-center mt-5`
              }
            >
              {message}
            </div>
          )
          }
          
          <section id="product-section" className="p-3 m-auto border rounded shadow bg-surface">
            {/* row */}
            <div className="row align-items-center mb-4">

              {/* img col */}
              <div className="col-12 col-md-6 align-items-center">
                <img
                  className="img-fixed-size img-fluid img-thumbnail rounded"
                  src={product.image}
                  alt={product.title}
                />
              </div>

              {/* title and price col */}
              <div className="col-12 col-md-6">
                <h2 className="text-light">{product.title}</h2>
                <div>
                  <h3 className="text-success fw-bold">{product.price}$</h3>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleAdd(product)}
                  >
                    <Icon.Cart2 />
                  </button>
                </div>
              </div>
            </div>

            {/* row */}
            <div className="row mt-3 text-light border-top">
              <h2 className="my-3">Description</h2>
              <p>{product.description}</p>
            </div>  

          
          
          </section>
        </main>
      </div>
    );
  }
}