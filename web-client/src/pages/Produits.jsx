import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCartIcon, InformationCircleIcon, StarIcon, QuestionMarkCircleIcon, PhoneIcon, BoltIcon, TableCellsIcon, WalletIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline';
import ProductsList from '../components/ProductsList';
import prod1 from '/prod1.png'
import prod2 from '/prod2.png'
import prod3 from '/prod3.png'
import prod4 from '/prod4.png'
import homeImage2 from '/home-products-image-2.png'
import homeImage3 from '/home-products-image-3.png'
import homeImage4 from '/home-presentation-image.png'
import homeBanner from '/home-banner.png'
import quote from '/quote.svg'
import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function Produits() {
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
        <main>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Choisir la découpe</span></h2>
              <section className="mt-5 text-left">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-36 my-10 ">
                {products.map((produit) => (
                  <div className="group relative  border-black border-2">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                    <img
                      src={ "http://localhost:5000/public/" + produit.imagePrincipale}
                      alt={"#"}
                      className="object-center mx-auto w-full product-image"
                    />
                  </div>
                  <div className="flex bg-yellow-300 p-4 border-2 border-black mt-4">
                    <p class="text-xl font-bold text-center mx-auto">{ produit.nomProduit }</p>
                  </div>
                  <div className="flex bg-gray-200 p-4">
                    <a href={"/produit/" +  produit.idProduit } className="text-center primary-bg-color w-full mx-auto p-2 rounded-full text-xl font-bold bg-black text-white">
                      Choisir et passer à la découpe 
                    </a>
                  </div>
                </div>
                ))} 
              </div>
              </section>
            </div>
          </div>
        </main>
    )
}