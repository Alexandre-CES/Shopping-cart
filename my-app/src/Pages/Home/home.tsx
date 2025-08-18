import { useEffect, useState, useRef } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/header';
import { Product } from '../../Types/Product';
import addToCart from '../../functions/addToCart';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    //fetch data and load products
    async function loadProducts() {
      const productsData = await fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .catch((err) => console.log('Error fething data: ' + err));

      setProducts(productsData);  
    }
    loadProducts();
  }, []);

  async function handleAdd(product: Product) {
    await addToCart(product).then(()=>{
      setMessage(`${product.title} Added to cart ✅`);
      setSuccess(true);
    }).catch((err)=>{
      setMessage(`Error adding ${product.title}: `+err);
      setSuccess(false);
    })
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setMessage(null), 3000);
  }

  return (
    <div className="container bg-dark" data-bs-theme="dark">
      <Header />
      <main>
        {
        message && (
          <div className={`alert ${success ? "alert-success" : "alert-danger"} z-1 position-fixed top-0 start-50 translate-middle-x text-center mt-5`}>
            {message}
          </div>
        )
        }
        <section className="mt-5 text-center">
          <Link to={"/cart"} className="btn btn-primary">
            See cart
          </Link>
        </section>
        <section className="container mt-5">
          <div className="row justify-content-center">
            {products.map((product) => {
              return (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-img-box d-flex">
                      <img
                        className="img-fixed-size img-fluid w-100 img-thumbnail rounded"
                        src={product.image}
                        alt={product.title}
                      />
                    </div>
                    <div className="card-body row align-items-center">
                      <h3 className="card-title">{product.price}$</h3>
                      <p>{product.title}</p>
                      <Link
                        to={"/product/" + product.id}
                        className="card-link text-secondary"
                      >
                        More
                      </Link>
                      <button
                        className="btn btn-primary click-transition"
                        onClick={() => handleAdd(product)}
                      >
                        <Icon.Cart2 />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
