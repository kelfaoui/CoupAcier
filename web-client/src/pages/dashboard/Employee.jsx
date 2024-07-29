
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';

function DashboardEmployee() {
  const [categories, setCategories] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagePrincipale, setImagePrincipale] = useState(null)
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [nomEmploye, setNomEmploye] = useState('')
  const [prenomEmploye, setPrenomEmploye] = useState('')
  const [email, setEmail] = useState('')
  const [nomRole, setNomRole] = useState('')
  const [motDePasse, setMotDepasse] = useState('')
 
  const [ params ] = useSearchParams()
  const id = params.get("id")

  const changeNomEmploye = (e) => {
    setNomEmploye(e.target.value)
  }

  const changePrenomEmploye = (e) => {
    setPrenomEmploye(e.target.value)
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changeNomRole = (e) => {
    setNomRole(e.target.value)
  }

  const changeMotDePasse = (e) => {
    setMotDepasse(e.target.value)
  }

  const submit = (e) => {

    const formData = new FormData();

    // ajouter le reste des informations sur le produit
    formData.append('nomEmploye', nomEmploye)
    formData.append('prenomEmploye', prenomEmploye)
    formData.append('email', email)
    formData.append('nomRole', nomRole)

    if(!id)
    axios.post('http://localhost:5000/employes', {
      nomEmploye: nomEmploye,
      prenomEmploye: prenomEmploye,
      email: email,
      nomRole: nomRole,
      motDePasse: motDePasse
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        window.location.href = '/dashboard/employes';
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setErrors({ global: "A storage error triggered" });
        }
      }).finally(() => {
        
      })
    if(id)
      axios.put('http://localhost:5000/employes', {
        idEmploye: id,
        nomEmploye: nomEmploye,
        prenomEmploye: prenomEmploye,
        email: email,
        nomRole: nomRole,
        motDePasse: motDePasse
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          window.location.href = '/dashboard/employes';
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 400) {
            setErrors({ global: "A storage error triggered" });
          }
        }).finally(() => {
          
        })
  }

  const getEmployee = () => {
    console.log(id)
    axios.get(`http://127.0.0.1:5000/employes/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage["token"]}`
      }
    })
      .then(function (res) {
        
        console.log(res.data.data)
        setNomEmploye(res.data.data.nomEmploye)
        setPrenomEmploye(res.data.data.prenomEmploye)
        setEmail(res.data.data.email)
        setNomRole(res.data.data.nomRole)
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoaded(true)
      });
  }  

  useEffect(() => {
    if(id)
      getEmployee()
  }, [])

  return (
    <div className="rounded w-4/5 p-5 flex">
      <div class="w-full p-5">
      { id == null ? <h2 class="text-2xl font-bold mb-4">Nouvel employé</h2> : <h2 class="text-2xl font-bold mb-4">Modifier employé</h2>}
     

        <form class="bg-white p-6 rounded w-full">
        <div class="grid grid-cols-2 gap-10">
  <div>
          <div class="mb-5">
        <label for="nomEmploye" class="block text-sm font-medium text-gray-700">Nom employé</label>
        <input type="text" id="nomEmploye" onChange={changeNomEmploye} value={nomEmploye} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir nom produit" required />
    </div>
    <div class="mb-5">
        <label for="prenomEmploye" class="block text-sm font-medium text-gray-700">Prénom employé</label>
        <input type="text" id="prenomEmploye" onChange={changePrenomEmploye} value={prenomEmploye} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir le prix" required />
    </div>
    <div class="mb-5">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="text" id="email" onChange={changeEmail} value={email} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir le Saisir l'émail" required />
    </div>
    <div class="mb-5">
        <label for="motDePasse" class="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input type="password" id="motDePasse" onChange={changeMotDePasse} value={motDePasse} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir le mot de passe" required />
    </div>
   
    <div class="mb-10">
        <label for="nomRole" class="block text-sm font-medium text-gray-700">Role</label>
        <select id="nomRole" onChange={changeNomRole} value={nomRole} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value={""} selected>Veuillez sélectionner</option>
            <option value={"Administrateur"}>Administrateur</option>
            <option value={"Service Commercial"}>Service Commercial</option>
            <option value={"Préparateur de Commande"}>Préparateur de Commande</option>
            <option value={"Automate"}>Automate</option>
        </select>
    </div>

    <a href="#" class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => submit()}>Enregistrer</a>
          </div>
</div>
        </form>
      </div>
    </div>
  );
}

export default DashboardEmployee;

