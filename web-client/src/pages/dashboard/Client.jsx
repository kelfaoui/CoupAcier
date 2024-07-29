
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function DashboardClient() {

  const [nomClient, setNomClient] = useState('');
  const [prenomClient, setPrenomClient] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [complementAdresse, setComplementAdresse] = useState('');
  const [password, setPassword] = useState('');
  const [siret, setSiret] = useState('');

  const [ params ] = useSearchParams()
  const id = params.get("id")

  const [errors, setErrors] = useState({});

  const siretChange = (e) => {
    setSiret(e.target.value);
  };

  const nomClientChange = (e) => {
    setNomClient(e.target.value);
  };

  const prenomClientChange = (e) => {
    setPrenomClient(e.target.value);
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

    if (!prenomClient.trim()) errors.prenomClient = 'Le prénom est obligatoire';
    else if (prenomClient.trim().length < 3) errors.prenomClient = 'Le prénom est trop court';

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

  const getClient = () => {

    axios.get(`http://127.0.0.1:5000/clients/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage["token"]}`
      }
    })
      .then(function (res) {
        console.log(res.data.data)

        setNomClient(res.data.data.nomClient)
        setPrenomClient(res.data.data.prenomClient)
        setEmail(res.data.data.email)
        setTelephone(res.data.data.telephone)
        setAdresse(res.data.data.adresse)
        setComplementAdresse(res.data.data.complementAdresse)
        setSiret(res.data.data.siret)

      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoaded(true)
      });
  }

  const submit = () => {
    var today = new Date();

    if (!id)
      axios.post(`http://localhost:5000/clients/`, {
        nomClient: nomClient,
        prenomClient: prenomClient,
        email: email,
        telephone: telephone,
        motDePasse: password,
        nomVoie: adresse + " " + complementAdresse,
        siret: '',
        statutCompte: 1,
        profilClient: 1,
        dateCreation: today.getFullYear()  + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
        .then(() => {
          window.location.href = '/dashboard/clients';
        })
        .catch((error) => {
          console.log(error);
        });

      if (id)
      axios.put(`http://localhost:5000/clients/`, {
        idClient: id,
        nomClient: nomClient,
        prenomClient: prenomClient,
        email: email,
        telephone: telephone,
        motDePasse: password,
        nomVoie: adresse + " " + complementAdresse,
        siret: siret,
        statutCompte: 1,
        profilClient: 1
      },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
        .then(() => {
          window.location.href = '/dashboard/clients';
        })
        .catch((error) => {
          console.log(error);
        });

  };

  useEffect(() => {
    if (id)
      getClient()
  }, [])


  return (
    <main>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-start">
        { id == null ? <h2 class="text-2xl font-bold mb-4">Créer client</h2> : <h2 class="text-2xl font-bold mb-4">Modifier client</h2>}
          <section className="mt-5 text-left">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-0">
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
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-0">
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
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-0">
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
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 my-0">
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
            <a onClick={() => submit()} class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Enregistrer</a>
            
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default DashboardClient;

