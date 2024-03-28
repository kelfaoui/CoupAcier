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

export default function Products() {
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
            <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Favoris</span></h2>
              <section className="mt-5 text-left">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-36 my-10">
                <div className="group relative p-5  rounded-xl bg-gray-200">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                    <img
                      src={homeImage1}
                      alt={"#"}
                      className="object-center mx-auto rounded-xl w-full"
                    />
                  </div>
                  <div className="mt-4 flex ">
                    <p class="text-4xl font-bold text-center mx-auto">50 tubes ronds</p>
                  </div>
                  <div className="mt-4 flex">
                    <p class="text-3xl font-bold text-blue-700 mx-auto">78.99 €</p>
                  </div>
                  <div className="mt-4 flex">
                    <a href="#" className="text-center primary-bg-color w-full mx-auto p-2 border-2 rounded-full text-xl font-bold bg-green-600">
                      Ajouter au panier
                    </a>
                  </div>
                  <div className="mt-4 flex">
                    <a href="#" className="text-center primary-bg-color w-full mx-auto p-2 border-2 rounded-full text-xl font-bold bg-red-600">
                      Supprimer des favoris
                    </a>
                  </div>
                </div>
                <div className="group relative p-5  rounded-xl bg-gray-200">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                    <img
                      src={homeImage2}
                      alt={"#"}
                      className="object-center mx-auto rounded-xl w-full"
                    />
                  </div>
                  <div className="mt-4 flex ">
                    <p class="text-4xl font-bold text-center mx-auto">50 tubes ronds</p>
                  </div>
                  <div className="mt-4 flex">
                    <p class="text-3xl font-bold text-blue-700 mx-auto">78.99 €</p>
                  </div>
                  <div className="mt-4 flex">
                    <a href="#" className="text-center primary-bg-color w-full mx-auto p-2 border-2 rounded-full text-xl font-bold bg-green-600">
                      Ajouter au panier
                    </a>
                  </div>
                  <div className="mt-4 flex">
                    <a href="#" className="text-center primary-bg-color w-full mx-auto p-2 border-2 rounded-full text-xl font-bold bg-red-600">
                      Supprimer des favoris
                    </a>
                  </div>
                </div>
                
              </div>
              </section>
            </div>
          </div>
        </main>
    )
}