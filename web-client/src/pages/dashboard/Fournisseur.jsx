
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';

function Fournisseur() {

  const [nomFournisseur, setNomFournisseur] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  // Adresse ici :
  const [numeroVoie, setNumeroVoie] = useState('')
  const [nomVoie, setNomVoie] = useState('')
  const [codePostale, setCodePostale] = useState('')
  const [ville, setVille] = useState('')

  const [ params ] = useSearchParams()
  const id = params.get("id")

  const [errors, setErrors] = useState({});


  const nomFournisseurChange = (e) => {
    setNomFournisseur(e.target.value)
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const telephoneChange = (e) => {
    setTelephone(e.target.value)
  }

  const numeroVoieChange = (e) => {
    setNumeroVoie(e.target.value)
  }

  const nomVoieChange = (e) => {
    setNomVoie(e.target.value)
  }

  const codePostaleChange = (e) => {
    setCodePostale(e.target.value)
  }

  const villeChange = (e) => {
    setVille(e.target.value)
  }

  const getFournisseur = () => {

    axios.get(`http://127.0.0.1:5000/providers/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage["token"]}`
      }
    })
    .then(function (res) {
      console.log(res.data.data)
      setNomFournisseur(res.data.data.nomFournisseur)
      setEmail(res.data.data.email)
      setTelephone(res.data.data.telephone)
      setNumeroVoie(res.data.data.numeroVoie)
      setNomVoie(res.data.data.nomVoie)
      setCodePostale(res.data.data.codePostale)
      setVille(res.data.data.ville)
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      setIsLoaded(true)
    });
}

  const submit = () => {
    if(!id)
    axios.post(`http://localhost:5000/providers/`, {
      nomFournisseur: nomFournisseur,
      email: email,
      telephone: telephone,
      numeroVoie: numeroVoie,
      nomVoie: nomVoie,
      codePostale: codePostale,
      ville: ville
    },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
      .then(() => {
        window.location.href = '/dashboard/fournisseurs';
      })
      .catch((error) => {
        console.log(error);
      });

      if(id)
      axios.put(`http://localhost:5000/providers/`, {
        idFournisseur: id,
        nomFournisseur: nomFournisseur,
        email: email,
        telephone: telephone,
        numeroVoie: numeroVoie,
        nomVoie: nomVoie,
        codePostale: codePostale,
        ville: ville
      },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
        .then(() => {
          window.location.href = '/dashboard/fournisseurs';
        })
        .catch((error) => {
          console.log(error);
        });

  };

  useEffect(() => {
    if(id)
      getFournisseur()
  }, [])


  return (
    <div className="rounded w-4/5 p-5 flex">
      <div class="w-3/4 p-5">
        <form class="bg-white p-6 rounded w-full max-w-sm">
          {/* <h2 class="text-2xl font-bold mb-4">Nouveau fournisseur</h2> */}

          <div class="mb-4">
            <label for="nomFournisseur" class="block text-gray-700">Nom Fournisseur</label>
            <input type="text" id="nomFournisseur" onChange={nomFournisseurChange} value={nomFournisseur} name="nomFournisseur" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>

          <div class="mb-4">
            <label for="telephone" class="block text-gray-700">Téléphone</label>
            <input type="text" id="telephone" onChange={telephoneChange} value={telephone} name="telephone" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email</label>
            <input type="email" id="email" onChange={emailChange} value={email} name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div class="mb-4">
                <label for="nomFournisseur" class="block text-gray-700">Numéro voie
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="numeroVoie" value={numeroVoie} onChange={numeroVoieChange}></input>
                    {errors.numeroVoie && <span className="error"> {errors.numeroVoie} </span>}
                  </label>
           
              </div>
              <div class="mb-4">                <label for="nomFournisseur" class="block text-gray-700">Nom voie
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="nomVoie" value={nomVoie} onChange={nomVoieChange}></input>
                    {errors.nomVoie && <span className="error"> {errors.nomVoie} </span>}
                  </label>
               
              </div>

     
              <div class="mb-4"><label for="nomFournisseur" class="block text-gray-700">Code postal
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="codePostale" value={codePostale} onChange={codePostaleChange}></input>
                    {errors.codePostale && <span className="error"> {errors.codePostale} </span>}
                  </label>

              </div>
              <div class="mb-10"><label for="nomFournisseur" class="block text-gray-700">Ville
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="ville" value={ville} onChange={villeChange}></input>
                    {errors.ville && <span className="error"> {errors.ville} </span>}
                  </label>
      
              </div>
          <a onClick={() => submit()} class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Enregistrer</a>
        </form>
      </div>
    </div>
  );
}

export default Fournisseur;

