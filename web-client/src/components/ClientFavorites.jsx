
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon , PlusIcon} from "@heroicons/react/24/outline";

function ClientFavorites() {
  const [favorites, setFavorites] = useState();
  const [isLoaded, setIsLoaded] = useState(false)
  
  const removeFromFavorites = (idProduit, idClient) => {

    axios.delete(`http://localhost:5000/favoris/${idProduit}/${idClient}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      window.location.href = "/favoris/"
    })
  }

  const getCommandes = () => {
    axios.get('http://127.0.0.1:5000/favoris/' + localStorage["user_id"], {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(function (res) {
        setFavorites(res.data.data);
        console.log(res.data.data);
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
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Favoris</span></h2>
            <section className="mt-5 text-left">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-36 my-10">
            {favorites.map((favori) => (
              <div className="group relative p-5  rounded-xl bg-gray-200">
                <div className=" election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                  <img
                    src={ "http://localhost:5000/public/" + favori.imagePrincipale}
                    alt={"#"}
                    className="object-center mx-auto rounded-xl w-full"
                  />
                </div>
                <div className="mt-4 flex ">
                  <p class="text-4xl font-bold text-center mx-auto">{favori.nomProduit}</p>
                </div>
                <div className="mt-4 flex">
                  <p class="text-3xl font-bold text-blue-700 mx-auto">{favori.nomProduit}</p>
                </div>
                <div className="mt-4 flex">
                  <a href="#" className="text-center primary-bg-color w-full mx-auto p-2 border-2 rounded-full text-xl font-bold bg-green-600">
                    Ajouter au panier
                  </a>
                </div>
                <div className="mt-4 flex">
                  <a onClick={() => removeFromFavorites(favori.idProduit, favori.idClient)} className="text-center primary-bg-color w-full mx-auto p-2 border-2 rounded-full text-xl font-bold bg-red-600">
                    Supprimer des favoris
                  </a>
                </div>
              </div>
                ))}
            </div>
            </section>
          </div>
        </div>
  );
}

export default ClientFavorites;

