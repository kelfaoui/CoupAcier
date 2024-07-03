
import axios from 'axios';
import { React, useEffect, useState } from 'react';

function DashboardHome() {
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
      <a class="bg-yellow-400 rounded-xl py-2 px-24 mb-10 text-xl font-bold border-white" href="#"><i>Ristourne</i></a><hr className="-mt-3" ></hr>
      <table cellSpacing={2} cellPadding={5} border={1} className="mt-10 border-collapse table-fixed text-sm bg-white text-left mb-20 w-full ">
        <thead className="border">
          <th className="p-3 border" colSpan={2}>Date</th>
          <th className="p-3 border" colSpan={3}>Montant total de l'achat (€)</th>
          <th className="p-3 border" colSpan={3}>Montant de la ristourne (€)</th>
          <th className="p-3 border" colSpan={2}>Validé par </th>
        </thead>
        <tbody> 
              <tr className="border">
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">2024-10-05</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">500</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">50</td>
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">Chabane KELFAOUI</td>
              </tr>
              <tr className="border">
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">2024-10-05</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">400</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">35</td>
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">Chabane KELFAOUI</td>
              </tr>
              <tr className="border">
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">2024-10-05</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">300</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">25</td>
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">Chabane KELFAOUI</td>
              </tr>
        </tbody>
      </table>
      <a class=" bg-yellow-400 rounded-xl py-2 px-24 mb-10 text-xl font-bold border-white mt-20" href="#"><i>Ristourne</i></a><hr className="-mt-3" ></hr>
      <table cellSpacing={2} cellPadding={5} border={1} className="mt-10 border-collapse table-fixed text-sm bg-white text-left w-full">
        <thead className="border">
          <th className="p-3 border" colSpan={2}>Matériaux</th>
          <th className="p-3 border" colSpan={3}>Prix d'achat (€)</th>
          <th className="p-3 border" colSpan={3}>Marge (%)</th>
          <th className="p-3 border" colSpan={2}>Prix de vente (€)</th>
        </thead>
        <tbody> 
              <tr className="border">
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">FERS PLATS</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">10</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">20</td>
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">12</td>
              </tr>
              <tr className="border">
              <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">&nbsp;</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">&nbsp;</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">&nbsp;</td>
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">&nbsp;</td>
              </tr>
              <tr className="border">
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">&nbsp;</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">&nbsp;</td>
                <td colSpan={3} className="border py-2 px-4 border-b border-gray-200">&nbsp;</td>
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-200">&nbsp;</td>
              </tr>
        </tbody>
      </table>
      </div>
      <div class="w-1/4 p-3">
      <a class=" float-right bg-yellow-400 rounded-xl py-2 px-10 mb-10 text-xl font-bold border-white mt-20" href="#"><i>Demandes de devis</i></a>
      <table cellSpacing={2} cellPadding={5} border={1} className="bg-gray-300 mt-10 border-collapse table-fixed text-smtext-left w-full rounded-3xl">
        <tbody> 
              <tr className="">
                <td colSpan={2} className="py-2 px-4 border-b border-gray-300">Mouhssine LAKHILI</td>
        
              </tr>
              <tr className="">
                <td colSpan={2} className="py-2 px-4 border-b border-gray-300">Abderahmane KONATE</td>
        
              </tr>
              <tr className="">
                <td colSpan={2} className="py-2 px-4 border-b border-gray-300">Hakim Ziyech</td>
        
              </tr>
              <tr className="">
                <td colSpan={2} className=" py-2 px-4 border-b border-gray-300">Youcef BEALILI</td>
        
              </tr>
              <tr className="">
                <td colSpan={2} className="border py-2 px-4 border-b border-gray-300">Yves BISSOUMA</td>
        
              </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default DashboardHome;

