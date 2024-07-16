
import axios from 'axios';
import { React, useEffect, useState } from 'react';

function Entrepot() {
    const [clients, setClients] = useState();
    const [isLoaded, setIsLoaded] = useState(false)
  
    const getClients = () => {
      axios.get('http://127.0.0.1:5000/clients', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      })
        .then(function (res) {
          setClients(res.data.data);
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
      getClients()
    })
  
  if(!isLoaded) return ("Loading")

  return (
    <div className="rounded w-4/5 p-5 flex">
      <div class="w-3/4 p-5">
      <form class="bg-white p-6 rounded w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4">Nouvel entrepot</h2>
        
        <div class="mb-4">
            <label for="villeEntrepot" class="block text-gray-700 w-1/2">Ville Entrepot</label>
            <input type="text" id="villeEntrepot" name="villeEntrepot" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        
        <div class="mb-4">
            <label for="codePostaleEntrepot" class="block text-gray-700">Code Postale Entrepot</label>
            <input type="number" id="codePostaleEntrepot" name="codePostaleEntrepot" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        
        <div class="mb-4">
            <label for="voieEntrepot" class="block text-gray-700">Voie Entrepot</label>
            <input type="text" id="voieEntrepot" name="voieEntrepot" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        
        <div class="mb-10">
            <label for="NumeroRueEntrepot" class="block text-gray-700">Numéro Rue Entrepot</label>
            <input type="number" id="NumeroRueEntrepot" name="NumeroRueEntrepot" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        
        <button type="submit" class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Enregistrer</button>
    </form>
      </div>
    </div>
  );
}

export default Entrepot;

