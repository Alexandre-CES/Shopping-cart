import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { Product } from '../../models/Product';
import addToCart from '../../utils/addToCart';
import Header from '../../components_tmp/header/Header';

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      const productData = await fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log('Error fething data: ' + err));

      setProduct(productData);
    }

    loadProducts();
  }, [id]);

  return (
    <div className='container-md'>
      <Header/>
      <main id="product-main" className="container-md mt-md-5 p-3 border rounded shadow">

        {/* row */}
        <div className="row align-items-center mb-4">

          {/* img col */}
          <div className="col-md">
            <img
              className="img-fixed-size img-fluid img-thumbnail rounded"
              src={product?.image}
              alt={product?.title}
            />
          </div>

          {/* title and price col */}
          <div className="col-md d-grid gap-2">
            <h2 className="text-light">{product?.title}</h2>
            <h3 className="text-success fw-bold">{product?.price}$</h3>
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                if (product !== undefined) {
                  addToCart(product);
                  navigate('/cart');
                } else {
                  console.error("undefined product");
                }
              }}
            >
              <Icon.Cart2 />
            </button>
          </div>
        </div>

        {/* row */}
        <div className="row mt-3 text-light border-top">
          <h2 className="my-3">Description</h2>
          <p>{product?.description}</p>
        </div>
      </main>
    </div>
  );
}
