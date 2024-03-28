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

export default function LoginPart() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const getProducts = () => {
    /*
    DROP TABLE IF EXISTS `client`;
    CREATE TABLE IF NOT EXISTS `client` (
      `idClient` int(11) NOT NULL AUTO_INCREMENT,
      `prenomClient` varchar(50) DEFAULT NULL,
      `nomClient` varchar(50) NOT NULL,
      `motDePasse` varchar(200) NOT NULL,
      `numeroVoie` int(11) NOT NULL,
      `nomVoie` varchar(200) NOT NULL,
      `codePostale` int(11) NOT NULL,
      `ville` varchar(100) NOT NULL,
      `telephone` varchar(13) DEFAULT NULL,
      `statutCompte` varchar(50) DEFAULT NULL,
      `codeGenere` varchar(100) DEFAULT NULL,
      `profilClient` tinyint(1) NOT NULL,
      `siret` varchar(14) NOT NULL,
      `email` varchar(200) NOT NULL,
      PRIMARY KEY (`idClient`),
      UNIQUE KEY `client_AK` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    */
   
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
            <section className="mt-10 text-left">
              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
                <div className="group relative bg-transparent">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 items-left flex">
                    <a className="primary-bg-color first-letter: py-2 block text-black font-bold text-center mx-auto w-3/4 border-4 border-black btn btn-primary hover-btn">
                      <i>JE SUIS PARTICULIER</i>
                    </a>
                  </div>
                </div>
                <div className="group relative bg-transparent">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 items-left flex">
                  <a href="/login-pro" className="primary-bg-color first-letter: py-2 block text-black font-bold text-center mx-auto w-3/4 border-4 border-black border-l-transparent border-t-transparent btn btn-primary hover-btn">
                      <i>JE SUIS PROFESSIONNEL</i>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="text-left bg-white border-4 border-black shift-top-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-0">
                <div className="group relative p-10 bg-white rounded-xl mt-10">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Email :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text"  ></input>
                    </label>
                  </div>
                  <div className="pt-5 election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Mot de passe :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="password" ></input>
                    </label>
                  </div>
                  <a className="pt-10 bg-white py-2 rounded block text-black font-bold text-center mx-auto button-to-front mb-5">
                    <span className="bg-blue-500  py-2 rounded lg:w-full block text-black font-bold text-center mx-auto button-to-front">Je me connecte
                    </span>
                  </a>
                  <a href="#" className=" mb-5 text-center block"><i>Mot de passe oublié ? </i></a>

                </div>
                <div className="group relative p-10 bg-white rounded-xl">
                <a className="pt-10 bg-white py-2 rounded block text-black font-bold text-center mx-auto button-to-front">
                  <h2 className="text-center mb-5">Je n'ai pas encore de compte</h2>
                    <a href="/register-part" className="bg-blue-500  py-2 rounded lg:w-1/2 block text-black font-bold text-center mx-auto button-to-front">Je m'inscris
                    </a>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}