import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCartIcon, InformationCircleIcon, StarIcon, QuestionMarkCircleIcon, PhoneIcon, BoltIcon, TableCellsIcon, WalletIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline';
import ProductsList from '../../components/ProductsList';
import homeImage1 from '/home-products-image-1.png'
import homeImage2 from '/home-products-image-2.png'
import homeImage3 from '/home-products-image-3.png'
import ImgPro from '/ImgPro.png'
import ImgPart from '/ImgPart.png'
import homeImage4 from '/home-presentation-image.png'
import homeBanner from '/home-banner.png'
import quote from '/quote.svg'
import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function LoginEmploye() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();

    const employee = {
      email: email,
      password: password,
    }

    axios.post(`http://localhost:5000/login-employee`, employee, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      localStorage.setItem("token", res.data.accessToken)
      localStorage.setItem("employe_id", res.data.user_id)
      window.location.href = "/dashboard/clients"
    })
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center w-1/2">
            <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Connectez-vous</span></h2>
            
            <section className="text-left bg-white border-4 border-black shift-top-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 xl:gap-x-8 my-0">
                <div className="group relative p-10 bg-white rounded-xl mt-10">
                  <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Email :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text"   value={email} onChange={changeEmail}></input>
                    </label>
                  </div>
                  <div className="pt-5 election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                    <label className="w-full font-bold">Mot de passe :
                      <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="password" value={password} onChange={changePassword}></input>
                    </label>
                  </div>
                  <a onClick={onSubmit} className="pt-10 bg-white py-2 rounded block text-black font-bold text-center mx-auto button-to-front mb-5">
                    <span className="bg-blue-500  py-2 rounded lg:w-full block text-black font-bold text-center mx-auto button-to-front">Je me connecte
                    </span>
                  </a>
                  <a href="#" className=" mb-5 text-center block"><i>Mot de passe oublié ? </i></a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}