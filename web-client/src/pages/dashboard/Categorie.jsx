
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';

function Categorie() {
  const [nomCategorie, setNomCategorie] = useState('');


  const [ params ] = useSearchParams()
  const id = params.get("id")

  const changeNomCategorie = (e) => {
    setNomCategorie(e.target.value)
  }

  const getCategorie = () => {

    axios.get(`http://127.0.0.1:5000/categories/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage["token"]}`
      }
    })
    .then(function (res) {
      console.log(res.data.data)
      setNomCategorie(res.data.data.nomCategorie)
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      setIsLoaded(true)
    });
}

  const submit = () => {
    if(!id)
    axios.post(`http://localhost:5000/categories/`, {
      nomCategorie: nomCategorie
    },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
      .then(() => {
        window.location.href = '/dashboard/categories';
      })
      .catch((error) => {
        console.log(error);
      });

      if(id)
      axios.put(`http://localhost:5000/categories/`, {
        idCategorie: id,
        nomCategorie: nomCategorie
      },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
        .then(() => {
          window.location.href = '/dashboard/categories';
        })
        .catch((error) => {
          console.log(error);
        });

  };

  useEffect(() => {
    if(id)
      getCategorie()
  }, [])

  return (
    <div className="rounded w-4/5 p-5 flex">
      <div class="w-3/4 p-5">
        <form class="bg-white p-6 rounded w-full max-w-sm">
                { id == null ? <h2 class="text-2xl font-bold mb-4">Nouvelle catégorie</h2> : <h2 class="text-2xl font-bold mb-4">Modifier catégorie</h2>}

          <div class="mb-10">
            <label for="nomFournisseur" class="block text-gray-700">Nom catégorie</label>
            <input type="text" id="nomFournisseur" name="nomFournisseur" value={nomCategorie} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={changeNomCategorie} required />
          </div>

          <a href="#" class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => submit()}>submit</a>
        </form>
      </div>
    </div>
  );
}

export default Categorie;

