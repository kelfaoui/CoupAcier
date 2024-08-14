import { Fragment } from 'react';
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

import { useState, useEffect, useContext } from 'react'
import { CartContext } from "../context/cart"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../components/Cart';

export default function Product() {
  const [showModal, setshowModal] = useState(false);
  const [product, setProduct] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const { id } = useParams()
  const { cartItems, addToCart , removeFromCart} = useContext(CartContext)

  const toggle = () => {
    setshowModal(!showModal);
  };

  const addToFavorites = (idProduit, idClient) => {
    const tuple = {
      idProduit: idProduit,
      idClient: idClient
    }

    axios.post(`http://localhost:5000/favoris/`, tuple, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      
    })
  }

  const notifyAddedToCart = (item) => toast.success(`${item.nomProduit} ajouté au panier !`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#fff',
      color: '#000',
    }
    });

  const notifyRemovedFromCart = (item) => toast.error(`${item.nomProduit} retiré du panier !`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff',
    }
    });

    const handleRemoveFromCart = (product) => {
      removeFromCart(product);
      notifyRemovedFromCart(product);
    };

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
  }, [])
  if(!isLoaded) return ("Loading..")
  return (
    <>
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 text-end">
          {!showModal && <button className='px-10 py-4 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
          onClick={toggle}
        >Mon panier ({cartItems.length})</button>}
            <section className="mt-5 text-left">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8 my-10">
                <div className="group relative p-5 bg-gray-300">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none  lg:h-50 items-center flex">
                    <img
                      src={ "http://localhost:5000/public/" + product.imagePrincipale}
                      alt={"#"}
                      className="object-center mx-auto rounded-xl w-full"
                    />
                  </div>
                </div>
                <div className="group relative p-5 bg-white border-2 border-black">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full rounded-md bg-white-200 lg:aspect-none  lg:h-100 items-center ">
                    <h2 className="text-xl *:font-bold tracking-tight text-black main-h2 inline-block w-full product-h"><i>{product.nomProduit}</i></h2>
                    <div className="mt-3 flex">
                      <p class="text-l font-bold text-black"><i>PRIX TTC :</i> {product.prixMetre} €</p>
                    </div>
                    <div className="mt-3 flex">
                      <p class="text-l font-bold text-black"><i>QUANTITE :</i></p><div class="ml-10 border-2 border-black px-3 text-2xl"> - </div><input class="border-2 border-black w-10 px-3" value="1"></input><div class="border-2 border-black px-3 text-2xl"> + </div>
                    </div>
                    <div className="mt-3 flex">
                      <p class="text-l font-bold text-black"><i>LONGUEUR EN CM :</i></p><div class="ml-10 border-2 border-black px-3 text-2xl bg-gray-400"> 1 cm </div>
                    </div>
                    <div className="mt-3 flex mb-10">
                      <p class="text-l font-bold text-black"><i>DISPONIBILITE :</i><span class=" px-3 text-xl text-green-600">Livraison sous 15 jours ouvrés</span></p>
                    </div>
                    <div className="flex">
                      <table class="border-collapse table-auto border-2 w-full k  border-black text-center mb-10">
                      <caption class="caption-top bg-yellow-300 border border-black ">
                      <h3 className="text-xl font-bold tracking-tight text-black  main-h2 inline-block w-full"><i class="text-xl">Dimensions possibles :</i></h3>
    </caption>
                        <thead> 
                          <tr>
                            <th class=" border-black border-2">Epaisseur (mm)</th>
                            <th class=" border-black border-2">Hauteur (mm)</th>
                            <th class=" border-black border-2">Largeur (mm)</th>
                            <th class=" border-black border-2">Masse linéaire (kg/m)</th>
                            <th class=" border-black border-2">Choix</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="b border-black border-2">3</td>
                            <td  class="b border-black border-2">20</td>
                            <td  class=" border-black border-2">20</td>
                            <td  class=" border-black border-2">0,97</td>
                            <td  class=" border-black border-2"><input type="checkbox" /></td>
                          </tr>
                          <tr>
                            <td class="b border-black border-2">4</td>
                            <td  class="b border-black border-2">30</td>
                            <td  class=" border-black border-2">30</td>
                            <td  class=" border-black border-2">1,97</td>
                            <td  class=" border-black border-2"><input type="checkbox" /></td>
                          </tr>
                          <tr>
                            <td class="b border-black border-2">5</td>
                            <td  class="b border-black border-2">40</td>
                            <td  class=" border-black border-2">40</td>
                            <td  class=" border-black border-2">3,97</td>
                            <td  class=" border-black border-2"><input type="checkbox" /></td>
                          </tr>
                          <tr>
                            <td class="b border-black border-2">6</td>
                            <td  class="b border-black border-2">50</td>
                            <td  class=" border-black border-2">50</td>
                            <td  class=" border-black border-2">4,88</td>
                            <td  class=" border-black border-2"><input type="checkbox" /></td>
                          </tr>
                          <tr>
                            <td class="b border-black border-2">7</td>
                            <td  class="b border-black border-2">60</td>
                            <td  class=" border-black border-2">60</td>
                            <td  class=" border-black border-2">5,88</td>
                            <td  class=" border-black border-2"><input type="checkbox" className="checkbox"/></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div classname="flex pt-10">
                     
                      <div className='mb-5 flex justify-between items-center'>
                {
                  !cartItems.find(item => item.id === product.idProduit) ? (
                    <button className='w-full px-2 py-2 bg-yellow-300 text-black rounded-full text-xs font-bold uppercase hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                      onClick={() => {
                        addToCart(product)
                        notifyAddedToCart(product)
                      }
                      }
                      >
                       Choisir et passer à la découpe
                      </button>
                  ) : (
                    <div className="flex gap-4">
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => {
                        addToCart(product)
                      }}
                    >
                      +
                    </button>
                    <p className='text-gray-600'>{cartItems.find(item => item.id === product.idProduit).quantity}</p>
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => {
                        const cartItem = cartItems.find((item) => item.id === product.idProduit);
                        if (cartItem.quantity === 1) {
                          handleRemoveFromCart(product);
                        } else {
                          removeFromCart(product);
                        }
                      }}
                    >
                      -
                    </button>
                  </div>
                  )
                }
              </div>
              <div>
                      <a onClick={()=> addToFavorites(product.idProduit, localStorage["user_id"])} className="text-center block w-full px-2 py-2 bg-yellow-300 text-black rounded-full text-xs font-bold uppercase hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                        Ajouter au favoris
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-5 text-left">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8 my-10">
                <div className="group relative p-5 bg-white">
                  <div className=" gap-10 election:aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-white-200 lg:aspect-none  lg:h-50 items-center flex">
                    <div class="bg-gray-100 w-1/3 h-36 border-black border-2"></div>
                    <div class="bg-gray-300 w-1/3 h-36"></div>
                    <div class="bg-gray-300 w-1/3 h-36"></div>
                  </div>
                </div>
                <div className="group relative bg-white">
                  <div className=" election:aspect-h-1 aspect-w-1 w-full rounded-md bg-white-200 lg:aspect-none  lg:h-100 items-center ">
                    
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Cart showModal={showModal} toggle={toggle} />
      </main>
    </>
  )
}