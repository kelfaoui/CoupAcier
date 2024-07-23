
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon , PlusIcon} from "@heroicons/react/24/outline";
import ClientOrders from '../components/ClientOrders';
function MesCommandes() {
  const [dommandes, setCommandes] = useState();
  const [isLoaded, setIsLoaded] = useState(false)
  
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
        setIsLoaded(true)
      });
  }
  useEffect(() => {
    getCommandes()
  })

  if (!isLoaded) return ("Loading")

  return (
    <div className="rounded w-full p-5 flex">
      <div class="w-full p-5">
        <a class="bg-yellow-400 rounded-xl py-2 px-24 mb-10 text-xl font-bold border-white" href="#"><i>Commandes</i></a><hr className="-mt-3" ></hr>
        <a href="#" className="bg-yellow-400 float-end rounded-lg p-2 mr-2 mt-3 mb-3">
                  <PlusIcon width={18} />
      </a>
        <ClientOrders />
      </div>
    </div>
  );
}

export default MesCommandes;

