import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom"
import { ShoppingCartIcon, InformationCircleIcon, StarIcon, QuestionMarkCircleIcon, PhoneIcon, BoltIcon, TableCellsIcon, WalletIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline';
import ProductsList from '../components/ProductsList';
import homeImage1 from '/fer-plat.png'
import homeImage2 from '/home-products-image-2.png'
import homeImage3 from '/home-products-image-3.png'
import homeImage4 from '/home-presentation-image.png'
import homeBanner from '/home-banner.png'
import quote from '/quote.svg'
import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function Product() {
  const [product, setProduct] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const { id } = useParams()

  const getProduct = () => {
    axios.get('http://127.0.0.1:5000/products/' + id)
      .then(function (res) {
        setProduct(res.data.data);
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
    getProduct()
  })

  if(!isLoaded) return ("Loading..")

  return (
    <>
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
            <section className="mt-5 text-left">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8 my-10">
                <div className="group relative p-5 bg-gray-300">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                    <img
                      src={ "http://localhost:5000/public/" + product.imagePrincipale}
                      alt={"#"}
                      className="object-center mx-auto rounded-xl w-full"
                    />
                  </div>
                </div>
                <div className="group relative p-10 bg-white border-2 border-black">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-100 items-center ">
                    <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block w-full"><span><i>{product.nomProduit}</i></span></h2>
                    <div className="mt-4 flex">
                      <p class="text-3xl font-bold text-black"><i>PRIX TTC :</i> {product.prixMetre} €</p>
                    </div>
                    <div className="mt-4 flex">
                      <p class="text-3xl font-bold text-black"><i>QUANTITE :</i></p><div class="ml-10 border-2 border-black px-3 text-2xl"> - </div><input class="border-2 border-black w-10 px-3" value="1"></input><div class="border-2 border-black px-3 text-2xl"> + </div>
                    </div>
                    <div className="mt-4 flex">
                      <p class="text-3xl font-bold text-black"><i>LONGUEUR EN CM :</i></p><div class="ml-10 border-2 border-black px-3 text-2xl bg-gray-400"> 1 cm </div>
                    </div>
                    <div className="mt-4 flex mb-10">
                      <p class="text-3xl font-bold text-black"><i>DISPONIBILITE :</i><span class=" px-3 text-xl text-green-600">Livraison sous 15 jours ouvrés</span></p>
                    </div>
                    <div classname="flex pt-28">
                      <a href="#" className="bg-blue w-1/2 border-black mx-auto p-6 border-2 rounded-full text-xl font-bold">
                        Ajouter au favoris
                      </a>
                      <a href="#" className="ml-5 primary-bg-color w-1/2 border-black mx-auto p-6 border-2 rounded-full text-xl font-bold bg-green-500">
                        Ajouter au panier
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-5 text-left">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8 my-10">
                <div className="group relative p-5 bg-white">
                  <div className=" gap-10 election:aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                    <div class="bg-gray-100 w-1/3 h-36 border-black border-2"></div>
                    <div class="bg-gray-300 w-1/3 h-36"></div>
                    <div class="bg-gray-300 w-1/3 h-36"></div>
                  </div>
                </div>
                <div className="group relative bg-white">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-100 items-center ">
                    <table class="border-collapse table-auto border-2 w-full k  border-black text-center">
                    <caption class="caption-top bg-yellow-300 border border-black ">
                    <h3 className="text-xl font-bold tracking-tight text-black  main-h2 inline-block w-full"><i class="text-xl">Dimensions possibles :</i></h3>
  </caption>
                      <thead> 
                        <tr>
                          <th class=" border-black border-2">&nbsp;&nbsp;&nbsp;</th>
                          <th class=" border-black border-2">A<br></br>Longeur en mm</th>
                          <th class=" border-black border-2">B<br></br>Epaisseur en mm</th>
                          <th class=" border-black border-2">Masse en kg</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="b border-black border-2">&nbsp;</td>
                          <td  class="b border-black border-2">&nbsp; </td>
                          <td  class=" border-black border-2">&nbsp; </td>
                          <td  class=" border-black border-2">&nbsp; </td>
                        </tr>
                        <tr>
                        <td class=" border-black border-2">&nbsp;</td>
                          <td  class=" border-black border-2">&nbsp; </td>
                          <td  class=" border-black border-2">&nbsp; </td>
                          <td  class=" border-black border-2">&nbsp; </td>
                        </tr>
                      </tbody>
                    </table>

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