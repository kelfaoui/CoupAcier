import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCartIcon, InformationCircleIcon} from '@heroicons/react/24/outline';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const getProducts = () => {
    axios.get('http://127.0.0.1:5000/products')
      .then(function (res) {
        setProducts(res.data.data);
        console.log(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoaded(true)
      });
  }
  useEffect(() => {
    getProducts()
  })

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {products.map((product) => (
      <div key={product.id} className="group relative p-5 bg-white rounded-xl">
        <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex product-img">
          <img
            src={"http://127.0.0.1:5000/public/" + product.imagePrincipale}
            alt={product.imageAlt}
            className="object-center mx-auto"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-l text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.nomProduit}
              </a>
            </h3>
            <p className="text-sm text-gray-700 description">
              {product.description}
            </p>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
         
        </div>
        <div className="flex items-start justify-between">
          <span className=" font-medium text-gray-900 text-xl py-3">{product.prixMetre} €</span>
          <div className="w-1/3 flex justify-between">
            <a href="/" className="bg-blue-700 text-white px-1 py-1 rounded-md mt-3">
            <ShoppingCartIcon width={24} height={24} />
            </a>
            <a href="/" className="bg-blue-700 text-white px-1 py-1 rounded-md mt-3">
            <InformationCircleIcon width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
    
}
export default ProductsList;