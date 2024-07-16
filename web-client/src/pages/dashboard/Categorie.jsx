
import axios from 'axios';
import { React, useEffect, useState } from 'react';

function Categorie() {
  const [nomCategorie, setNomcategorie] = useState('');

  const changeNomCategorie = (e) => {
    setNomcategorie(e.target.value)
  }

  const submit = () => {
    axios.post(`http://localhost:5000/categories/`, {
      nomCategorie: nomCategorie
    },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
      .then(() => {
        window.location.href = '/dashboard/categories';
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className="rounded w-4/5 p-5 flex">
      <div class="w-3/4 p-5">
        <form class="bg-white p-6 rounded w-full max-w-sm">
          <h2 class="text-2xl font-bold mb-4">Nouvelle catégorie</h2>

          <div class="mb-10">
            <label for="nomFournisseur" class="block text-gray-700">Nom catégorie</label>
            <input type="text" id="nomFournisseur" name="nomFournisseur" value={nomCategorie} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={changeNomCategorie} required />
          </div>

          <a href="#" class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => submit()}>submit</a>
        </form>
      </div>
    </div>
  );
}

export default Categorie;

