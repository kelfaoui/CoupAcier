
import axios from 'axios';
import { React, useEffect, useState } from 'react';

function ProductDashboard() {
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
          <h2 class="text-2xl font-bold mb-4">Nouvel article</h2>

          <div class="mb-5">
        <label for="nomProduit" class="block text-sm font-medium text-gray-700">Nom produit</label>
        <input type="text" id="nomProduit" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir nom produit" required />
    </div>
    <div class="mb-5">
        <label for="prixMetre" class="block text-sm font-medium text-gray-700">Prix mêtre linéaire</label>
        <input type="number" id="prixMetre" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir le prix" required />
    </div>
    <div class="mb-5">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3" placeholder="Saisir la description produit" required></textarea>
    </div>
    <div class="mb-5">
        <label for="imagePrincipale" class="block text-sm font-medium text-gray-700">Image principale</label>
        <input type="file" id="imagePrincipale" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Sélectionner une image" required />
    </div>
    <div class="mb-5">
        <label for="image1" class="block text-sm font-medium text-gray-700">Image 1</label>
        <input type="file" id="image1" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Sélectionner une image" />
    </div>
    <div class="mb-5">
        <label for="image2" class="block text-sm font-medium text-gray-700">Image 2</label>
        <input type="file" id="image2" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Sélectionner une image" />
    </div>
    <div class="mb-5">
        <label for="hauteur" class="block text-sm font-medium text-gray-700">Hauteur</label>
        <input type="number" id="hauteur" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir la héauteur" required />
    </div>
    <div class="mb-5">
        <label for="epaisseur" class="block text-sm font-medium text-gray-700">Epaisseur</label>
        <input type="number" id="epaisseur" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir l'épaisseur" required />
    </div>
    <div class="mb-5">
        <label for="marge" class="block text-sm font-medium text-gray-700">Marge</label>
        <input type="number" id="marge" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir la marge" required />
    </div>
    <div class="mb-5">
        <label for="masseLineaire" class="block text-sm font-medium text-gray-700">Masse linéaire</label>
        <input type="number" id="masseLineaire" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir la masse linéaire" required />
    </div>
    <div class="mb-5">
        <label for="tva" class="block text-sm font-medium text-gray-700">Taux TVA (%)</label>
        <input type="number" id="tva" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir le taux TVA" required />
    </div>
    <div class="mb-5">
        <label for="referenceProduit" class="block text-sm font-medium text-gray-700">Référence produit</label>
        <input type="text" id="referenceProduit" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir la référence produit" required />
    </div>
    <div class="mb-10">
        <label for="idCategorie" class="block text-sm font-medium text-gray-700">Catégorie</label>
        <select id="idCategorie"  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" selected>Veuillez sélectionner</option>
        </select>
        <input type="number" id="idCategorie" placeholder="Enter category ID" required />
    </div>

          <a href="#" class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => submit()}>Enregistrer</a>
        </form>
      </div>
    </div>
  );
}

export default ProductDashboard;