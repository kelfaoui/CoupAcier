
import axios from 'axios';
import { React, useEffect, useState } from 'react';

function Clientss() {
    const [clients, setClients] = useState();
    const [isLoaded, setIsLoaded] = useState(false)
  
    const getClients = () => {
      axios.get('http://127.0.0.1:5000/clients')
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
    <div className="rounded w-4/5 p-5">
      <table cellSpacing={2} cellPadding={5} border={1} className="border-collapse table-fixed w-full text-sm bg-white text-left">
        <thead>
          <th colSpan={1}>#</th>
          <th colSpan={2}>Nom</th>
          <th colSpan={2}>Prénom</th>
          <th colSpan={2}>Email</th>
          <th colSpan={2}>Telephone</th>
          <th colspan={1} className="rightborder"></th>
        </thead>
        <tbody> 
          {clients?.map((c) => {
            return (
              <tr>
                <td colSpan={1} className="py-2 px-4 border-b border-gray-200">{c.idClient}</td>
                <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{c.nomClient}</td>
                <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{c.prenomClient}</td>
                <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{c.email}</td>
                <td colspan={2} className="py-2 px-4 border-b border-gray-200">{c.telephone}</td>
                <td colspan={1} className="py-2 px-4 border-b border-gray-200 text-right">
                  <p className="flex text-xs">
                    <a href="#"></a>
                    <a href="#"></a>
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className=" float-right mt-2">
        <div class="flex flex-col items-center">
          <div class="inline-flex mt-2 xs:mt-0">
            <button  class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 rounded hover:bg-gray-900">
              Prev
            </button>
            <span class="text-sm text-gray-700 mx-3 my-1">
              Page <span class="font-semibold text-gray-900"></span> / <span class="font-semibold text-gray-900"></span>
            </span>
            <button class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 border-gray-700 rounded hover:bg-gray-900">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientss;

