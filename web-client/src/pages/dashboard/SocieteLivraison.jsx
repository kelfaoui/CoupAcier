
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';

function SocieteLivraison() {
  const [formData, setFormData] = useState({
    idLivraison: '',
    nomSocieteLivraison: '',
    siretLivraison: '',
    telephone: '',
    email: ''
  });

  const [params] = useSearchParams()
  const id = params.get("id")

  const submit = () => {
    var today = new Date();

    if (!id)

      axios.post(`http://localhost:5000/delivery-companies`, formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
        .then(() => {
          window.location.href = '/dashboard/societes-livraison';
        })
        .catch((error) => {
          console.log(error);
        });

    if (id)
      formData.idLivraison = id
      axios.put(`http://localhost:5000/delivery-companies/`, formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
        .then(() => {
          window.location.href = '/dashboard/societes-livraison';
        })
        .catch((error) => {
          console.log(error);
        });

  };

  const getDeliveryCompany = () => {

    axios.get(`http://127.0.0.1:5000/delivery-companies/${id}`, {
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
      setIsLoaded(true)
    });
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  useEffect(() => {
    if(id)
      getDeliveryCompany()
  }, [])

  return (
    <form className="w-1/2 bg-white p-8 rounded-lg -md">
      <h1 className="text-lg font-bold mb-5">Société livraison</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomSocieteLivraison">
          Nom Société
        </label>
        <input
          type="text"
          name="nomSocieteLivraison"
          value={formData.nomSocieteLivraison}
          onChange={handleChange}
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="siretLivraison">
          SIRET
        </label>
        <input
          type="text"
          name="siretLivraison"
          value={formData.siretLivraison}
          onChange={handleChange}
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
          Téléphone
        </label>
        <input
          type="text"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
        />
      </div>
      <div className="mb-10">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
        />
      </div>
      <div className="flex items-center justify-between">
      <a  onClick={() => submit()} class="w-1/2 bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Enregistrer</a>
      </div>
    </form>
  );
}

export default SocieteLivraison;

