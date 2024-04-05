import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCartIcon, InformationCircleIcon, StarIcon, QuestionMarkCircleIcon, PhoneIcon, BoltIcon, TableCellsIcon, WalletIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline';
import ProductsList from '../components/ProductsList';
import homeImage1 from '/home-products-image-1.png'
import homeImage2 from '/home-products-image-2.png'
import homeImage3 from '/home-products-image-3.png'
import ImgPro from '/ImgPro.png'
import ImgPart from '/ImgPart.png'
import homeImage4 from '/home-presentation-image.png'
import homeBanner from '/home-banner.png'
import quote from '/quote.svg'
import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function LoginPage() {
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
            <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Dites-nous plus sur vous :</span></h2>
            <section className="mt-5 text-left">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
                <div className="group relative p-5 bg-white">
                  <img
                    src={ImgPart}
                    alt={"#"}
                    className="object-center mx-auto rounded-xl w-96 h-96" // Définir la taille souhaitée ici
                  />
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <a href="/login-part" className="primary-bg-color first-letter: py-2 block text-black font-bold text-center mx-auto w-3/4 border-4 border-black border-l-transparent border-t-transparent btn btn-primary hover-btn">
                      <i>JE SUIS PARTICULIER</i>
                    </a>
                  </div>
                </div>
                <div className="group relative p-5 bg-white">
                  <img
                    src={ImgPro}
                    alt={"#"}
                    className="object-center mx-auto rounded-xl w-96 h-96"
                  />
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <a href="/login-pro" className="primary-bg-color first-letter: py-2 block text-black font-bold text-center mx-auto w-3/4 border-4 border-black border-l-transparent border-t-transparent btn btn-primary hover-btn">
                      <i>JE SUIS PROFESSIONNEL</i>
                    </a>
                  </div>
                </div>
              </div>

            </section>
          </div>
        </div>
      </main>
    </>
  )
}
