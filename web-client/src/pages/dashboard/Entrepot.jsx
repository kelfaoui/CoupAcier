
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';

function Entrepot() {
  
    const [isLoaded, setIsLoaded] = useState(false);
    const [villeEntrepot, setVilleEntrpot] = useState('')
    const [codePostaleEntrepot, setCodePostaleEntrepot] = useState(0)
    const [voieEntrepot, setVoieEntrepot] = useState('')
    const [numeroRueEntrepot, setNumeroRueEntrepot] = useState(0)

    const [ params ] = useSearchParams()
    const id = params.get("id")


    const changeVilleEntrepot = (e) => {
      setVilleEntrpot(e.target.value)
    }

    const changeCodePostaleEntrepot = (e) => {
      setCodePostaleEntrepot(e.target.value)
    }

    const changeVoieEntrepot = (e) => {
      setVoieEntrepot(e.target.value)
    }

    const changeNumeroRueEntrepot = (e) => {
      setNumeroRueEntrepot(e.target.value)
    }
  
    const getEntrepot = () => {

      axios.get(`http://127.0.0.1:5000/warhouses/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage["token"]}`
        }
      })
      .then(function (res) {
        console.log(res.data.data)
        setVilleEntrpot(res.data.data.villeEntrepot)
        setCodePostaleEntrepot(res.data.data.codePostaleEntrepot)
        setVoieEntrepot(res.data.data.voieEntrepot)
        setNumeroRueEntrepot(res.data.data.numeroRueEntrepot)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoaded(true)
      });
  }

  const submit = (e) => {
    if(!id)
    axios.post('http://localhost:5000/warhouses', {
      villeEntrepot: villeEntrepot,
      codePostaleEntrepot: codePostaleEntrepot,
      voieEntrepot: voieEntrepot,
      numeroRueEntrepot: numeroRueEntrepot
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        window.location.href = '/dashboard/entrepots';
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setErrors({ global: "A storage error triggered" });
        }
      }).finally(() => {
        
      })
    if(id)
      axios.put('http://localhost:5000/warhouses', {
        idEntrepot: id,
        villeEntrepot: villeEntrepot,
        codePostaleEntrepot: codePostaleEntrepot,
        voieEntrepot: voieEntrepot,
        numeroRueEntrepot: numeroRueEntrepot
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          window.location.href = '/dashboard/entrepots';
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 400) {
            setErrors({ global: "A storage error triggered" });
          }
        }).finally(() => {
          
        })
  }

  useEffect(() => {
    if(id)
      getEntrepot()
  }, [])
  
  if(!isLoaded & id) return ("Loading")

  return (
    <div className="rounded w-4/5 p-5 flex">
      <div class="w-3/4 p-5">
      <form class="bg-white p-6 rounded w-full max-w-sm">
      { id == null ? <h2 class="text-2xl font-bold mb-4">Nouvel entrepot</h2> : <h2 class="text-2xl font-bold mb-4">Modifier entrepot</h2>}
        
        <div class="mb-4">
            <label for="villeEntrepot" class="block text-gray-700 w-1/2">Ville Entrepot</label>
            <input type="text" id="villeEntrepot" name="villeEntrepot" value={villeEntrepot}  onChange={changeVilleEntrepot} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        
        <div class="mb-4">
            <label for="codePostaleEntrepot" class="block text-gray-700">Code Postale Entrepot</label>
            <input type="number" id="codePostaleEntrepot" name="codePostaleEntrepot" value={codePostaleEntrepot} onChange={changeCodePostaleEntrepot} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        
        <div class="mb-4">
            <label for="voieEntrepot" class="block text-gray-700">Voie Entrepot</label>
            <input type="text" id="voieEntrepot" name="voieEntrepot"  value={voieEntrepot} onChange={changeVoieEntrepot} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        
        <div class="mb-10">
            <label for="NumeroRueEntrepot" class="block text-gray-700">Numéro Rue Entrepot</label>
            <input type="number" id="NumeroRueEntrepot" name="numeroRueEntrepot" value={numeroRueEntrepot} onChange={changeNumeroRueEntrepot} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        
      
    <a class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => submit()}>Enregistrer</a>
    </form>
      </div>
    </div>
  );
}

export default Entrepot;

