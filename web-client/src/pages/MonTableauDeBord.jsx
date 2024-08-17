
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon , PlusIcon} from "@heroicons/react/24/outline";
import ClientOrders from '../components/ClientOrders';
function MonTableauDeBord() {
  const [dommandes, setCommandes] = useState();
  const [isLoaded, setIsLoaded] = useState(false)
  const [client, setClient] = useState([]);

  const getClient = () => {
    axios.get('http://127.0.0.1:5000/clients/' + localStorage['user_id'], {headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }})
      .then(function (res) {
        setClient(res.data.data);
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
    getClient()
  }, [])

  const getCommandes = () => {
    axios.get('http://127.0.0.1:5000/orders/client-orders/' + localStorage["user_id"], {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(function (res) {
        setCommandes(res.data.data);
        console.log(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
       
      });
  }
  useEffect(() => {
    getCommandes()
    getClient()
  }, [])

  if (!isLoaded) return ("Loading")

  return (
    <div className="rounded w-full p-5 flex">
       
      <div class="w-full p-5">
      <h1 className="font-bold my-5 text-2xl mb-10">Bienvenue {client.prenomClient} !</h1>
        <a class="bg-yellow-400 rounded-xl py-2 px-24 mb-5 text-xl font-bold border-white" href="#"><i>Commandes</i></a><hr className="-mt-3" ></hr>
        <a href="#" className="bg-yellow-400 float-end rounded-lg p-2 mr-2 mt-3 mb-3">
                  <PlusIcon width={18} />
      </a>
        <ClientOrders />
        <div class="w-full p-5">
        <a class="bg-yellow-400 rounded-xl py-2 px-24 mb-10 text-xl font-bold border-white" href="#"><i>Mon profil</i></a><hr className="-mt-3" ></hr>
        <p className="mb-2 mt-20"><strong>Prénom : </strong>{client.prenomClient}</p>
            <p className="my-2"><strong>Nom : </strong>{client.nomClient}</p>
            <p className="my-2"><strong>Email : </strong>{client.email}</p>
            <p className="my-2"><strong>Téléphone : </strong>{client.telephone}</p>
            <p className="my-2"><strong>Siret : </strong>{client.siret}</p>
            <p className="my-2"><strong>Type client : </strong>{client.profilClient}</p>
            <p className="my-2"><strong>Status compte : </strong><span className="bg-yellow-300 text-black px-5 py-1 rounded">{client.siret ? 'Actif' : 'Bloqué'}</span></p>
      </div>
      </div>
    </div>
  );
}

export default MonTableauDeBord;