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
  const [nomClient, setNomClient] = useState('');
  const [prenomClient, setPrenomClient] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [complementAdresse, setComplementAdresse] = useState('');
  const [password, setPassword] = useState('');
  const [siret, setSiret] = useState('')

  const [errors, setErrors] = useState({});

  const nomClientChange = (e) => {
    setNomClient(e.target.value);
  };

  const siretChange = (e) => {
    setSiret(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  
  const telephoneChange = (e) => {
    setTelephone(e.target.value);
  };

  const adresseChange = (e) => {
    setAdresse(e.target.value);
  };

  const complementAdresseChange = (e) => {
    setComplementAdresse(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

 
  const validateEmail = (email) => {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return String(email)
      .toLowerCase()
      .match(regExp);
  };

  const validateForm = () => {

    const errors = {};
    if (!nomClient.trim()) errors.nomClient = 'Le nom est obligatoire';
    else if (nomClient.trim().length < 3) errors.nomClient = 'Le nom est trop court';

    if (!siret.trim()) errors.siret = 'Le N° SIRET est obligatoire';
    else if (siret.trim().length < 3) errors.siret = 'Le N° SIRET est trop court';

    if (!email.trim()) errors.email = 'L\'email est obligatoire';
    else if (!validateEmail(email.trim())) errors.email = 'L\'email est trop court';

    if (!password.trim()) errors.password = 'Le mot de passe est obligatoire';
    else if (password.trim().length < 3) errors.password = 'Le mot de passe est trop court';

    if (!adresse.trim()) errors.adresse = "L'adresse est obligatoire";
    else if (adresse.trim().length < 3) errors.adresse = "L'adresse est obligatoire";

    if (!complementAdresse.trim()) errors.complementAdresse = "Le complément d'adresse est obligatoire";
    else if (complementAdresse.trim().length < 3) errors.complementAdresse = "Le complément d'adresse est obligatoire";

    if (!telephone.trim()) errors.telephone = 'Le téléphone est obligatoire';
    else if (telephone.trim().length < 3) errors.telephone = 'Le téléphone est trop court';

    setErrors(errors);

    if (Object.keys(errors).length === 0) Register();
    else return;
  } 

  const Register = () => {
    var today = new Date();
    
    axios.post(`http://localhost:5000/clients/`, {
      nomClient: nomClient,
      prenomClient: prenomClient,
      email: email,
      telephone: telephone,
      motDePasse: password,
      nomVoie: adresse + " " + complementAdresse,
      siret: siret,
      statutCompte: 1,
      profilClient: 2,
      dateCreation: today.getFullYear()  + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    })
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          // Si le serveur renvoie une erreur 400, cela signifie que l'utilisateur existe déjà
          setErrors({ email: "Un utilisateur avec le même mail existe déja." });
        } else {
          // Gestion d'autres erreurs
          setErrors({ general: "Erreur inconnue." });
        }
      });

  };
  return (
    <>
    <main>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Créer votre compte professionnel</span></h2>
          <section className="mt-5 text-left">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                  <label className="w-full font-bold">Nom société :
                    <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="nomClient" value={nomClient} onChange={nomClientChange}></input>
                    {errors.nomClient && <span className="error"> {errors.nomClient} </span>}
                  </label>
                </div>
              </div>
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                  <label className="w-full font-bold">N° SIRET :
                    <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" value={siret} onChange={siretChange}></input>
                    {errors.siret && <span className="error"> {errors.siret} </span>}
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                  <label className="w-full font-bold">Adresse postale :
                    <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="adresse" value={adresse} onChange={adresseChange}></input>
                    {errors.adresse && <span className="error"> {errors.adresse} </span>}
                  </label>
                </div>  
              </div>
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                  <label className="w-full font-bold">Complément d'adresse :
                    <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" value={complementAdresse} onChange={complementAdresseChange}></input>
                    {errors.complementAdresse && <span className="error"> {errors.complementAdresse} </span>}
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                  <label className="w-full font-bold">Email :
                    <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" value={email} onChange={emailChange}></input>
                    {errors.email && <span className="error"> {errors.email} </span>}
                  </label>
                </div>
              </div>
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                  <label className="w-full font-bold">Numéro de Téléphone :
                    <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" value={telephone} onChange={telephoneChange} ></input>
                    {errors.telephone && <span className="error"> {errors.telephone} </span>}
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                  <label className="w-full font-bold">Mot de passe :
                    <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="password" value={password} onChange={passwordChange} ></input>
                    {errors.password && <span className="error"> {errors.password} </span>}
                  </label>
                </div>
              </div>
              <div className="group relative p-5 bg-white rounded-xl">
                <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                  <label className="w-full font-bold">Confirmer le mot de passe:
                    <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="password" ></input>
                    {errors.password && <span className="error"> {errors.password} </span>}
                  </label>
                
                </div>
              </div>
            </div>
            <div className="pt-10">
              <a className="bg-white  px-3 py-2 rounded lg:w-1/3 block text-black font-bold text-center mx-auto button-to-front" onClick={validateForm}>
              <span className="bg-blue-500  px-3 py-2 rounded lg:w-4/5 block text-black font-bold text-center mx-auto button-to-front" >S'inscrire
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