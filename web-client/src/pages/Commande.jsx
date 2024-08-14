
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Commande = () => {
    const [formData, setFormData] = useState({
      dateCommande: '',
      statusCommande: '',
      devis: false,
      type: '',
      dateLivraison: '',
      referenceLivraison: '',
      ModeReception: '',
      reference: '',
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission (e.g., send data to the server)
      console.log('Form data submitted:', formData);
    };
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Modifier commande</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div class="grid grid-cols-2 gap-10">
          <div>
            <label className="block">Date Commande:</label>
            <input
              type="datetime-local"
              className="w-full border rounded p-2"
              name="dateCommande"
              value={formData.dateCommande}
              onChange={handleChange}
            />
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
              onChange={handleChange}
            />
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
              type="datetime-local"
              className="w-full border rounded p-2"
              name="dateLivraison"
              value={formData.dateLivraison}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block">Reference Livraison:</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              name="referenceLivraison"
              value={formData.referenceLivraison}
              onChange={handleChange}
            />
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
              onChange={handleChange}
            />
          </div>
          <a onClick={() => submit()} class="w- text-center bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Enregistrer</a>
          </div>
        </form>
      </div>
    );
  };
  
export default Commande;
