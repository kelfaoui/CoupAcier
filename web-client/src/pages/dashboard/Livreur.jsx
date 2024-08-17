import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Livreur = () => {
  const [formData, setFormData] = useState({
    nomLivreur: '',
    prenomLivreur: '',
    motDePasse: '',
    email: '',
    idLivraison: ''
  });

  const [params] = useSearchParams()
  const id = params.get("id")


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const submit = () => {
    var today = new Date();

    if (!id)
      axios.post(`http://localhost:5000/delivery-men/`, formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
        .then(() => {
          window.location.href = '/dashboard/livreurs';
        })
        .catch((error) => {
          console.log(error);
        });


    if (id)
      formData.idLivreur = id
    axios.put(`http://localhost:5000/delivery-men/`, formData,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
      .then(() => {
      
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
       window.location.href = '/dashboard/livreurs';
      });

  };

  const getDeliveryMan = () => {

    axios.get(`http://127.0.0.1:5000/delivery-men/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage["token"]}`
      }
    })
      .then(function (res) {
        console.log(res.data.data)
        setFormData(res.data.data)

      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        //setIsLoaded(true)
      });
  }

  useEffect(() => {
    if(id)
      getDeliveryMan()
  }, [])


  return (
    <form className="w-1/2 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-lg font-bold mb-5">Livreur</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomLivreur">
          Nom Livreur
        </label>
        <input
          type="text"
          name="nomLivreur"
          value={formData.nomLivreur}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenomLivreur">
          Prénom Livreur
        </label>
        <input
          type="text"
          name="prenomLivreur"
          value={formData.prenomLivreur}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motDePasse">
          Mot de Passe
        </label>
        <input
          type="password"
          name="motDePasse"
          value={formData.motDePasse}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idLivraison">
          ID Livraison
        </label>
        <input
          type="number"
          name="idLivraison"
          value={formData.idLivraison}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
     

      <div className="flex items-center justify-between">
        <a onClick={() => submit()} class="w-1/2 bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Enregistrer</a>
      </div>
    </form>
  );
};

export default Livreur;