
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon , PlusIcon} from "@heroicons/react/24/outline";

function DashboardDevis() {

  const [commandes, setCommandes] = useState();
  const [isLoaded, setIsLoaded] = useState(false)

  const getCommandes = () => {
    axios.get('http://127.0.0.1:5000/orders/quots', {
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
  }, [])

  if (!isLoaded) return ("Loading")

  return (
    <div className="rounded w-full p-5 flex">
      <div class="w-full p-5">
        <a class="bg-yellow-400 rounded-xl py-2 px-24 mb-10 text-xl font-bold border-white" href="#"><i>Devis</i></a><hr className="-mt-3" ></hr>
        <a href="#" className="bg-yellow-400 float-end rounded-lg p-2 mr-2 mt-3 mb-3">
                  <PlusIcon width={18} />
      </a>
        <table border={1} className="mt-10 border-collapse table-auto text-sm bg-white text-left mb-20 w-full ">
          <thead className="border">
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Client</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border"></th>
          </thead>
          <tbody>
          {commandes.map((commande) => (
            <tr className="border">
              <td className="border py-2 px-4 border-b border-gray-200">{commande.dateCommande.substr(0, 10)}</td>
              <td className="border py-2 px-4 border-b border-gray-200">{commande.prenomClient + " " + commande.nomClient}</td>
              <td className="border py-2 px-4 border-b border-gray-200">{commande.total} €</td>
              <td className="border py-2 px-4 border-b border-gray-200 text-end">
                <a href="#" className="bg-yellow-400 float-end rounded-lg p-2">
                  <TrashIcon width={18}></TrashIcon> </a>
                <a href={"/dashboard/order?id=" + commande.idCommande} className="bg-yellow-400 float-end rounded-lg p-2 mr-2">
                  <PencilSquareIcon width={18} />
                </a>
                <a href="#" className="bg-yellow-400 float-end rounded-lg p-2 mr-2">
                  <MagnifyingGlassIcon width={18}></MagnifyingGlassIcon> </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardDevis;