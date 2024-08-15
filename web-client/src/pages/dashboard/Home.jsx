import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCartIcon, InformationCircleIcon, StarIcon, QuestionMarkCircleIcon, PhoneIcon, BoltIcon, TableCellsIcon, WalletIcon, CreditCardIcon, TruckIcon} from '@heroicons/react/24/outline';
// import ProductsList from '../components/ProductsList';
import homeImage1 from '/home-products-image-1.png'
import homeImage2 from '/home-products-image-2.png'
import homeImage3 from '/home-products-image-3.png'
import homeImage4 from '/home-presentation-image.png'
import homeBanner from '/home-banner.png'
import quote from '/quote.svg'
import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function Home() {
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
  }, [])

  return (
    <>
    <main>
      <div className="bg-white">
        <section>
          <img
            src={homeBanner}
            alt={"#"}
            className="w-full"
          />
        </section>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
          <section className="mt-5">
            <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Nos matériaux</span></h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 my-10">
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                  <img
                    src={homeImage1}
                    alt={"#"}
                    className="object-center mx-auto rounded-xl"
                  />
                </div>
                <div className="mt-4 grid justify-items-center">
                <a href="#" className="bg-white  w-72 max-w-md border-black p-3.5 border-2  text-xl font-bold text-center hover-btn2">
                    Inox
                  </a>
                </div>
              </div>
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                  <img
                    src={homeImage2}
                    alt={"#"}
                    className="object-center mx-auto rounded-xl"
                  />
                </div>
                <div className="mt-4 grid justify-items-center">
                <a href="#" className="bg-white w-72 max-w-md border-black p-3.5 border-2 hover-btn2 text-xl font-bold text-center">
                    Aluminium
                  </a>
                </div>
              </div>
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                  <img
                    src={homeImage3}
                    alt={"#"}
                    className="object-center mx-auto rounded-xl"
                  />
                </div>
                <div className="mt-4 grid justify-items-center">
                <a href="#" className="bg-white w-72 max-w-md border-black p-3.5 border-2 hover-btn2  text-xl font-bold text-center">
                    Acier
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-5">
            <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Une découpe sur-mesure</span></h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-100 items-center flex">
                  <img
                    src={homeImage4}
                    alt={"#"}
                    className="object-center mx-auto rounded-xl"
                  />
                </div>
                <div className="mt-4 flex">
                </div>
              </div>
              <div className="group relative p-5 bg-white rounded-xl py-24">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-100 items-center">
                  <p className="text-3xl w-full text-left mb-5">Découpe précise, solutions sur mesure</p>
                  <p className="w-full text-left text-l mb-4">Nos services de découpe sur mesure se distinguent par l'utilisation de technologie de pointe, telles que les machines
                    de découpe laser, plasma et jet d'eau. Ces équipements de dernière génération nous permettent de réaliser des coupes
                    précises et nettes, même sur des métaux de grande épaisseur et de diverses natures.
                  </p>
                  <p className="w-full text-left text-l">Que se soit pour des projets industriels, architecturaux, ou pour la fabrications de pièces spécifiques
                    Coup'Acier s'engage à fournir des solutions sur mesure adaptées aux besoins uniques de chaque client. Notre équipe technique
                    collabore étroitement avec nos clients pour comprendre leur exigences et assurer une exécution pércise de chaque découpe.
                  </p>
                </div>
              </div>

            </div>
          </section>
          <section className="mt-5">
            <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto text-center"><span>Nos clients parlent de nous</span></h2>
            <div className="mx-auto w-1/3 text-3xl font-bold mt-10"><StarIcon color="#fee715" width={64} className="inline" /> 4,8/5</div>
          </section>
        </div>
        <section className="mt-0 bg-black text-white w-full py-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 my-10">
            <div className="group relative p-5 bg-black rounded-xl">
              <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                <div className="rounded-full primary-bg-color py-4 block px-5 font-bold mx-auto text-black text-4xl">
                  M
                </div>
              </div>
              <div>
                <p className="w-1/2 border-black mx-auto p-2 rounded-full text-xl text-white">
                  <i className="ml-4">Mohssine LAKHILI</i>
                </p>
              </div>
              <div className="text-center">
                <img className="mx-auto my-5" width={64} src={quote} />
              </div>
             
              <div>
                <p className="text-center text-lg"><i>
                  Service exceptionnel, qualité remarquable, une référence en découpe sur mesure de métaux. Je recommande!
                </i>
                </p>
              </div>
            </div>
            <div className="group relative p-5 bg-black rounded-xl">
              <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                <div className="rounded-full primary-bg-color py-4 block text-4xl px-6 font-bold mx-auto text-black">
                  C
                </div>
              </div>
              <div>
                <p className="w-1/2 border-black mx-auto p-2 rounded-full text-xl text-white">
                  <i className="ml-4">Chabane KELFAOUI</i>
                </p>
              </div>
              <div className="text-center">
                <img className="mx-auto my-5" width={64} src={quote} />
              </div>
             
              <div>
                <p className="text-center text-lg"><i>
                  Coup'Acier excelle dans la précision, répondant à nos besoins sur mesure avec efficacité.
                </i>
                </p>
              </div>
            </div>
            <div className="group relative p-5 bg-black rounded-xl">
              <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                <div className="rounded-full primary-bg-color py-4 block text-3xl px-6 font-bold mx-auto text-black">
                  A
                </div>
              </div>
              <div>
                <p className="w-1/2 border-black mx-auto p-2 rounded-full text-lg text-white">
                  <i className="">Abdarahmane KONATE</i>
                </p>
              </div>
              <div className="text-center">
                <img className="mx-auto my-5" width={64} src={quote} />
              </div>
             
              <div>
                <p className="text-center text-lg"><i>
                  Coup'Acier conjuge expertise technologique et service client impeccable, offrant des solutions de découpe sur mesure.
                </i>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-0 w-full py-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 my-10">
            <div className="group relative p-5 rounded-xl">
              <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
               
                <PhoneIcon className="mx-auto mb-4" width={72}/>
               
              </div>
              <div className="text-center font-bold">
                <h2 class="text-2xl">Service client</h2>
              </div>
             
              <div>
                <p className="text-center text-2xl"><i>
                  Joignables 7/7
                </i>
                </p>
              </div>
            </div>
            <div className="group relative p-5 rounded-xl">
              <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
              
                <TruckIcon className="mx-auto mb-4" width={72}/>
               
              </div>
              <div className="text-center font-bold">
                <h2 class="text-2xl">Livraison sécurisée</h2>
              </div>
             
              <div>
                <p className="text-center text-2xl"><i>
                  Partout en France
                </i>
                </p>
              </div>
            </div>
            <div className="group relative p-5 rounded-xl">
              <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                <WalletIcon className="mx-auto mb-4" width={72}/>
              </div>
              <div className="text-center font-bold">
                <h2 class="text-2xl">Satisfait ou rembourcé</h2>
              </div>
              <div>
                <p className="text-center text-2xl"><i>
                  Retour sous 20 jours
                </i>
                </p>
              </div>
            </div>
            <div className="group relative p-5 rounded-xl">
              <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
               
                <CreditCardIcon className="mx-auto mb-4" width={72}/>
               
              </div>
              <div className="text-center font-bold">
                <h2 class="text-2xl">Paiement sécurisé</h2>
              </div>
             
              <div>
                <p className="text-center text-2xl"><i>
                  Paiment en toute tranquilité
                </i>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
          </>
  )
}