
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
function Entrepots() {
    const [entrepots, setEntrepots] = useState();
    const [isLoaded, setIsLoaded] = useState(false)
  
    const deleteItem = (id) => {
      alert("Test")
      axios.delete(`http://127.0.0.1:5000/warhouses/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      })
        .then(function (res) {
          console.log(res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          //window.location.href = "/dashboard/entrepots"
        });
    }

    const getentrepots = () => {
      axios.get('http://127.0.0.1:5000/warhouses', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      })
        .then(function (res) {
          setEntrepots(res.data.data);
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
      getentrepots()
    }, [])
  
  if(!isLoaded) return ("Loading")

  return (
    <div className="rounded w-full p-5 flex">
      <div class="w-full p-5">
      <a class="bg-yellow-400 rounded-xl py-2 px-24 mb-10 text-xl font-bold border-white" href="#"><i>Entrepots</i></a><hr className="-mt-3" ></hr>
      <a href="/dashboard/entrepot" className="bg-yellow-400 float-end rounded-lg p-2 mr-2 mt-3 mb-3">
                  <PlusIcon width={18} />
      </a>
      <table border={1} className="mt-10 border-collapse table-auto text-sm bg-white text-left mb-20 w-full ">
        <thead className="border">
          <th className="p-3 border" >Id</th>
          <th className="p-3 border" >Ville</th>
          <th className="p-3 border" >Code postal</th>
          <th className="p-3 border" >Adresse</th>
          <th className="p-3 border" ></th>
        </thead>
        <tbody> 
        {entrepots.map((entrepot) => (
              <tr className="border">
                <td className="border py-2 px-4 border-b border-gray-200">{ entrepot.idEntrepot }</td>
                <td className="border py-2 px-4 border-b border-gray-200">{ entrepot.villeEntrepot }</td>
                <td className="border py-2 px-4 border-b border-gray-200">{ entrepot.codePostaleEntrepot }</td>
                <td className="border py-2 px-4 border-b border-gray-200">{ entrepot.numeroRueEntrepot + " " + entrepot.voieEntrepot }</td>
                <td>
                <a onClick={()=> deleteItem(entrepot.idEntrepot)} className="bg-yellow-400 float-end rounded-lg p-2">
                  <TrashIcon width={18}></TrashIcon>
                </a>
                <a href={"/dashboard/entrepot?id=" + entrepot.idEntrepot} className="bg-yellow-400 float-end rounded-lg p-2 mr-2">
                  <PencilSquareIcon width={18} />
                </a>
                <a  className="bg-yellow-400 float-end rounded-lg p-2 mr-2">
                  <MagnifyingGlassIcon width={18}></MagnifyingGlassIcon>
                </a>
                </td>
              </tr>
         ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Entrepots;