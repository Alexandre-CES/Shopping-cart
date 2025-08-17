import { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/header';
import { Product } from '../../Types/Product';
import addToCart from '../../functions/addToCart';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div className="container bg-dark" data-bs-theme="dark">
      <Header />
      <main>
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
                        onClick={() => addToCart(product)}
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
