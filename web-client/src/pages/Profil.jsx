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

export default function Profil() {
  const [showModal, setshowModal] = useState(false);
  const [client, setClient] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const { id } = useParams()

  const getClient = () => {
    axios.get('http://127.0.0.1:5000/clients/' + localStorage['user_id'], {headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }})
      .then(function (res) {
        setClient(res.data.data);
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
    getClient()
  }, [])
  if(!isLoaded) return ("Loading..")
  return (
    <>
      <main>
        <div className="bg-white p-10">
           
        <a class="bg-yellow-400 rounded-xl py-2 px-24 mb-10 text-xl font-bold border-white" href="#"><i>Profil</i></a><hr className="-mt-3" ></hr>
            <p className="mb-5 mt-20"><strong>Prénom : </strong>{client.prenomClient}</p>
            <p className="my-5"><strong>Nom : </strong>{client.nomClient}</p>
            <p className="my-5"><strong>Email : </strong>{client.email}</p>
            <p className="my-5"><strong>Téléphone : </strong>{client.telephone}</p>
            <p className="my-5"><strong>Siret : </strong>{client.siret}</p>
            <p className="my-5"><strong>Type client : </strong>{client.profilClient}</p>
            <p className="my-5"><strong>Status compte : </strong><span className="bg-yellow-300 text-black px-5 py-1 rounded">{client.siret ? 'Actif' : 'Bloqué'}</span></p>
            
        </div>
      </main>
    </>
  )
}