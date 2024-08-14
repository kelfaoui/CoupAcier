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
import ClientFavorites from '../components/ClientFavorites';

export default function Favoris() {
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
        <ClientFavorites />
      </main>
    </>
  )
}