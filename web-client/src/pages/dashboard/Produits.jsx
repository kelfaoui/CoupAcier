
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
function DashboardProduits() {
    const [produits, setProduits] = useState();
    const [isLoaded, setIsLoaded] = useState(false)
  
    const getProduits = () => {
      axios.get('http://127.0.0.1:5000/products', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      })
        .then(function (res) {
          setProduits(res.data.data);
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
      getProduits()
    }, [])
  
  if(!isLoaded) return ("Loading")

  return (
    <div className="rounded w-full p-5 flex">
      <div class="w-full p-5">
      <a class="bg-yellow-400 rounded-xl py-2 px-24 mb-10 text-xl font-bold border-white" href="#"><i>Produits</i></a><hr className="-mt-3" ></hr>
      <table border={1} className="mt-10 border-collapse table-auto text-sm bg-white text-left mb-20 w-full ">
        <thead className="border">
          <th className="p-3 border" >Id</th>
          <th className="p-3 border" >Image</th>
          <th className="p-3 border" >Nom produit</th>
          <th className="p-3 border" >Prix mètre</th>
          <th className="p-3 border" >Hauteur</th>
          <th className="p-3 border" >Epaisseur</th>
          <th className="p-3 border" ></th>
        </thead>
        <tbody> 
        {produits.map((produit) => (
              <tr className="border">
                <td className="border py-2 px-4 border-b border-gray-200"><img width={48} src={"http://localhost:5000/public/" + produit.imagePrincipale} /></td>
                <td className="border py-2 px-4 border-b border-gray-200">{produit.idProduit}</td>
                <td className="border py-2 px-4 border-b border-gray-200">{produit.nomProduit}</td>
                <td className="border py-2 px-4 border-b border-gray-200">{produit.prixMetre}</td>
                <th className="p-3 border" >{produit.hauteur}</th>
                <td className="border py-2 px-4 border-b border-gray-200">{produit.epaisseur}</td>
                <td className="border py-2 px-4 border-b border-gray-200 text-end">
                <a href="#" className="bg-yellow-400 float-end rounded-lg p-2">
                  <TrashIcon width={18}></TrashIcon>
                </a>
                <a href="#" className="bg-yellow-400 float-end rounded-lg p-2 mr-2">
                  <PencilSquareIcon width={18} />
                </a>
                <a href="#" className="bg-yellow-400 float-end rounded-lg p-2 mr-2">
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

export default DashboardProduits;

