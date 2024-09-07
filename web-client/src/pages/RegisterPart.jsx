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
  const [confirmPassword, setConfirmPassword] = useState(''); // Add state for confirm password

  // Adresse ici :
  const [numeroVoie, setNumeroVoie] = useState('')
  const [nomVoie, setNomVoie] = useState('')
  const [codePostale, setCodePostale] = useState('')
  const [ville, setVille] = useState('')


  const [errors, setErrors] = useState({});

  const nomClientChange = (e) => {
    setNomClient(e.target.value);
    validateForm({ nomClient: e.target.value }); // Validate on change
  };

  const prenomClientChange = (e) => {
    setPrenomClient(e.target.value);
    validateForm({ prenomClient: e.target.value }); // Validate on change
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
    validateForm({ email: e.target.value }); // Validate on change
  };

  const telephoneChange = (e) => {
    setTelephone(e.target.value);
    validateForm({ telephone: e.target.value }); // Validate on change
  };

  const adresseChange = (e) => {
    setAdresse(e.target.value);
    validateForm({ adresse: e.target.value }); // Validate on change
  };

  const complementAdresseChange = (e) => {
    setComplementAdresse(e.target.value);
  };

  const numeroVoieChange = (e) => {
    setNumeroVoie(e.target.value);
    validateForm({ numeroVoie: e.target.value }); // Validate on change
  }

  const nomVoieChange = (e) => {
    setNomVoie(e.target.value);
    validateForm({ nomVoie: e.target.value }); // Validate on change
  }

  const codePostaleChange = (e) => {
    setCodePostale(e.target.value);
    validateForm({ codePostale: e.target.value }); // Validate on change
  }

  const villeChange = (e) => {
    setVille(e.target.value);
    validateForm({ ville: e.target.value }); // Validate on change
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
    validateForm({ password: e.target.value }); // Validate on change
  };

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateForm({ confirmPassword: e.target.value }); // Validate on change
  };

  const validateEmail = (email) => {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return String(email)
      .toLowerCase()
      .match(regExp);
  };

  const validatePassword = (password) => {
    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12}$/;
    return regExp.test(password);
  };

  const validateForm = (fieldValues = {}) => {
    const tempErrors = { ...errors };

    if ('nomClient' in fieldValues)
      if (!fieldValues.nomClient.trim()) tempErrors.nomClient = 'Le nom est obligatoire';
      else if (fieldValues.nomClient.trim().length < 3) tempErrors.nomClient = 'Le nom est trop court';
      else delete tempErrors.nomClient;

    if ('prenomClient' in fieldValues)
      if (!fieldValues.prenomClient.trim()) tempErrors.prenomClient = 'Le prénom est obligatoire';
      else if (fieldValues.prenomClient.trim().length < 3) tempErrors.prenomClient = 'Le prénom est trop court';
      else delete tempErrors.prenomClient;

    if ('email' in fieldValues)
      if (!fieldValues.email.trim()) tempErrors.email = 'L\'email est obligatoire';
      else if (!validateEmail(fieldValues.email.trim())) tempErrors.email = 'L\'email n\'est pas valide';
      else delete tempErrors.email;

    if ('password' in fieldValues)
      if (!fieldValues.password.trim()) tempErrors.password = 'Le mot de passe est obligatoire';
      else if (!validatePassword(fieldValues.password.trim())) tempErrors.password = 'Le mot de passe doit contenir 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
      else delete tempErrors.password;

    if ('confirmPassword' in fieldValues)
      if (fieldValues.confirmPassword !== password) tempErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      else delete tempErrors.confirmPassword;

    if ('telephone' in fieldValues)
      if (!fieldValues.telephone.trim()) tempErrors.telephone = 'Le téléphone est obligatoire';
      else if (fieldValues.telephone.trim().length < 3) tempErrors.telephone = 'Le téléphone est trop court';
      else delete tempErrors.telephone;

    setErrors(tempErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (Object.keys(errors).length === 0) Register();
  };

  const Register = () => {
    var today = new Date();

    axios.post(`http://localhost:5000/clients/`, {
      nomClient,
      prenomClient,
      email,
      telephone,
      motDePasse: password,
      siret: '',
      statutCompte: 1,
      profilClient: 1,
      dateCreation: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
      numeroVoie,
      nomVoie,
      codePostale,
      ville
    })
    .then(() => {
      window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrors({ email: "Un utilisateur avec le même mail existe déjà." });
      } else {
        setErrors({ general: "Erreur inconnue." });
      }
    });
  };

  return (
    <>
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-black main-h2 inline-block mx-auto">
              <span>Créer votre compte particulier</span>
            </h2>
            <section className="mt-5 text-left">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-10">
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Nom :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="nomClient" value={nomClient} onChange={nomClientChange} />
                        {errors.nomClient && <span className="error">{errors.nomClient}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Prénom :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="prenomClient" value={prenomClient} onChange={prenomClientChange} />
                        {errors.prenomClient && <span className="error">{errors.prenomClient}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">E-mail :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="email" name="email" value={email} onChange={emailChange} />
                        {errors.email && <span className="error">{errors.email}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Téléphone :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="tel" name="telephone" value={telephone} onChange={telephoneChange} />
                        {errors.telephone && <span className="error">{errors.telephone}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Adresse :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="adresse" value={adresse} onChange={adresseChange} />
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Complément d'adresse :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="complementAdresse" value={complementAdresse} onChange={complementAdresseChange} />
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Numéro de Voie :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="numeroVoie" value={numeroVoie} onChange={numeroVoieChange} />
                        {errors.numeroVoie && <span className="error">{errors.numeroVoie}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Nom de Voie :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="nomVoie" value={nomVoie} onChange={nomVoieChange} />
                        {errors.nomVoie && <span className="error">{errors.nomVoie}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Code Postale :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="codePostale" value={codePostale} onChange={codePostaleChange} />
                        {errors.codePostale && <span className="error">{errors.codePostale}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Ville :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="text" name="ville" value={ville} onChange={villeChange} />
                        {errors.ville && <span className="error">{errors.ville}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Mot de passe :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="password" name="password" value={password} onChange={passwordChange} />
                        {errors.password && <span className="error">{errors.password}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="group relative p-5 bg-white rounded-xl">
                    <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-left flex">
                      <label className="w-full font-bold">Confirmation mot de passe :
                        <input className="bg-gray-300 p-2 w-full mt-2 rounded" type="password" name="confirmPassword" value={confirmPassword} onChange={confirmPasswordChange} />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                  </span>
                  S'inscrire
                </button>
                {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
