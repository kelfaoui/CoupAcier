import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCartIcon, InformationCircleIcon, StarIcon, QuestionMarkCircleIcon, PhoneIcon, BoltIcon, TableCellsIcon, WalletIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline';
import ProductsList from '../components/ProductsList';
import homeImage1 from '/home-products-image-1.png'
import homeImage2 from '/home-products-image-2.png'
import homeImage3 from '/home-products-image-3.png'
import homeImage4 from '/home-presentation-image.png'
import homeBanner from '/home-banner.png'
import quote from '/quote.svg'
import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function RegisterPart() {
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
    <>
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Créer votre compte particulier</span></h2>
            <section className="mt-5 text-left">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
                <div className="group relative p-5 bg-white rounded-xl">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Nom :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text"  ></input>
                    </label>
                  </div>
                </div>
                <div className="group relative p-5 bg-white rounded-xl">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Prénom :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text"  ></input>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
                <div className="group relative p-5 bg-white rounded-xl">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Adresse postale :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text"  ></input>
                    </label>
                  </div>
                </div>
                <div className="group relative p-5 bg-white rounded-xl">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Complément d'adresse :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text"  ></input>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
                <div className="group relative p-5 bg-white rounded-xl">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Email :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text"  ></input>
                    </label>
                  </div>
                </div>
                <div className="group relative p-5 bg-white rounded-xl">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Numéro de Téléphone :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text"  ></input>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
                <div className="group relative p-5 bg-white rounded-xl">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Mot de passe :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="password" ></input>
                    </label>
                  </div>
                </div>
                <div className="group relative p-5 bg-white rounded-xl">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Confirmer le mot de passe:
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="password" ></input>
                    </label>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <a className="bg-white  px-3 py-2 rounded lg:w-1/3 block text-black font-bold text-center mx-auto button-to-front">
                <span className="bg-blue-500  px-3 py-2 rounded lg:w-4/5 block text-black font-bold text-center mx-auto button-to-front">S'inscrire
                </span>
                </a>
                <hr className="line-behind-button"></hr>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}