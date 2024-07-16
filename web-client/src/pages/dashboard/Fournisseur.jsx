
import axios from 'axios';
import { React, useEffect, useState } from 'react';

function Fournisseur() {

  const [nomFournisseur, setNomFournisseur] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const nomFournisseurChange = (e) => {
    setNomFournisseur(e.target.value)
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const telephoneChange = (e) => {
    setTelephone(e.target.value)
  }

  const submit = () => {
    axios.post(`http://localhost:5000/providers/`, {
      nomFournisseur: nomFournisseur,
      email: email,
      telephone: telephone
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


  return (
    <div className="rounded w-4/5 p-5 flex">
      <div class="w-3/4 p-5">
        <form class="bg-white p-6 rounded w-full max-w-sm">
          <h2 class="text-2xl font-bold mb-4">Nouveau fournisseur</h2>

          <div class="mb-4">
            <label for="nomFournisseur" class="block text-gray-700">Nom Fournisseur</label>
            <input type="text" id="nomFournisseur" onChange={nomFournisseurChange} value={nomFournisseur} name="nomFournisseur" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>

          <div class="mb-4">
            <label for="telephone" class="block text-gray-700">Téléphone</label>
            <input type="text" id="telephone" onChange={telephoneChange} value={telephone} name="telephone" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div class="mb-10">
            <label for="email" class="block text-gray-700">Email</label>
            <input type="email" id="email" onChange={emailChange} value={email} name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>

          <a onClick={() => submit()} class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Enregistrer</a>
        </form>
      </div>
    </div>
  );
}

export default Fournisseur;

