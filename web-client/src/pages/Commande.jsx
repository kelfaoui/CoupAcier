
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CommandeClient = () => {
    const [orderItems, setOrderItems] = useState([])
    const [formData, setFormData] = useState({
      idCommande: 0,
      dateCommande: '',
      statusCommande: '',
      devis: false,
      type: '',
      dateLivraison: '',
      referenceLivraison: '',
      ModeReception: '',
      reference: '',
    });
    
    const [params] = useSearchParams()
    const id = params.get("id")

    const getOrder = () => {
      axios.get('http://127.0.0.1:5000/orders/' + id, {
        headers: {
          'Authorization': `Bearer ${localStorage["token"]}`
        }
      })
        .then(function (res) {
          
          console.log(res.data)
          console.log(res.data.data.ModeReception)
          setFormData({
            idCommmande: id,
            dateCommande: res.data.data.dateCommande.substring(0, 16),
            statusCommande: res.data.data.statusCommande,
            devis: res.data.data.devis == 1 ? true : false,
            type: res.data.data.type,
            dateLivraison: res.data.data.dateLivraison ?  res.data.data.dateLivraison.substring(0, 10) : '',
            referenceLivraison: res.data.data.referenceLivraison,
            ModeReception: res.data.data.ModeReception,
            reference: res.data.data.reference
          })
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
         // setIsLoaded(true)
        });
    }

    const getOrderItems = () => {
      axios.get('http://127.0.0.1:5000/product-orders/order-items/' + id, {
        headers: {
          'Authorization': `Bearer ${localStorage["token"]}`
        }
      })
        .then(function (res) {
          
          setOrderItems(res.data.data)
          
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // setIsLoaded(true)
        });
    }
  
    useEffect(() => {
      if(id) {
        getOrder()
        getOrderItems()
      }
    }, [])

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  

    const update = () => {
      var today = new Date();
      formData.idCommande = id
      if (id)
        axios.put(`http://localhost:5000/orders/`, formData ,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
          }
        )
          .then(() => {
            window.location.href = '/dashboard/commandes';
          })
          .catch((error) => {
            console.log(error);
          });
    };
  
  
    return (
      <><div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Modifier commande</h2>
        <form className="space-y-4">
          <div class="grid grid-cols-2 gap-10">
            <div>
              <label className="block">Date Commande:</label>
              <input
                type="datetime-local"
                className="w-full border rounded p-2"
                name="dateCommande"
                value={formData.dateCommande}
                onChange={handleChange} />
            </div>
            <div>
              <label className="block">Status Commande :</label>
              <select
                className="w-full border rounded p-2"
                name="statusCommande"
                value={formData.statusCommande}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="En attente">En attente</option>
                <option value="Validé">Validé</option>
                <option value="En Decoupage">En Decoupage</option>
                <option value="Decoupé">Decoupé</option>
                <option value="En Cours de Livraison">En Cours de Livraison</option>
                <option value="Livré">Livré</option>
                <option value="Non livré">Non livré</option>
              </select>
            </div>
            <div>
              <label className="block">Devis :</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="devis"
                checked={formData.devis}
                onChange={handleChange} />
            </div>
            <div>
              <label className="block">Type :</label>
              <select
                className="w-full border rounded p-2"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="Commande">Commande</option>
                <option value="Liste d'envie">Liste d'envie</option>
              </select>
            </div>
            <div>
              <label className="block">Date Livraison:</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                name="dateLivraison"
                value={formData.dateLivraison}
                onChange={handleChange} />
            </div>
            <div>
              <label className="block">Reference Livraison:</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                name="referenceLivraison"
                value={formData.referenceLivraison}
                onChange={handleChange} />
            </div>
            <div>
              <label className="block">Mode Réception:</label>
              <select
                className="w-full border rounded p-2"
                name="ModeReception"
                value={formData.ModeReception}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="A LIVRER">A LIVRER</option>
                <option value="A RETIRER">A RETIRER</option>
              </select>
            </div>
            <div>
              <label className="block">Reference:</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                name="reference"
                value={formData.reference}
                onChange={handleChange} />
            </div>
            <a onClick={() => update()} class="w- text-center bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Enregistrer</a>
          </div>
        </form>
      </div>
     
      <div className="container mx-auto p-4">
      <h2 class="text-lg font-semi-bold">Liste des articles</h2>
          <table border={1} className="mt-10 border-collapse table-auto text-sm bg-white text-left mb-20 w-full ">
            <thead className="border">
              <th className="p-3 border">Id</th>
              <th className="p-3 border">Nom produit</th>
              <th className="p-3 border">Qte</th>
              <th className="p-3 border">Prix Metre</th>
              <th className="p-3 border">Dimension coupe</th>
            </thead>
            <tbody>
              {orderItems.map((orderItem) => (
                <tr className="border">
                  <td className="border py-2 px-4 border-b border-gray-200">{orderItem.idDecoupage}</td>
                  <td className="border py-2 px-4 border-b border-gray-200">{orderItem.nomProduit}</td>
                  <td className="border py-2 px-4 border-b border-gray-200">{orderItem.quantite}</td>
                  <td className="border py-2 px-4 border-b border-gray-200">{orderItem.prixMetre}</td>
                  <th className="p-3 border">{orderItem.dimensionCoupe}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
export default CommandeClient;