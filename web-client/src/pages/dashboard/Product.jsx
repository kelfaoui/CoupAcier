
import axios from 'axios';
import { React, useEffect, useState } from 'react';

function ProductDashboard() {
  const [categories, setCategories] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagePrincipale, setImagePrincipale] = useState(null)
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [nomProduit, setNomProduit] = useState('')
  const [prixMetre, setPrixMetre] = useState(0)
  const [description, setDescription] = useState('')
  const [hauteur, setHauteur] = useState(0)
  const [epaisseur, setEpaisseur] = useState(0)
  const [marge, setMarge] = useState(0)
  const [masseLineaire, setMasseLineaire] = useState(0)
  const [tva, setTVA] = useState(0)
  const [referenceProduit, setReferenceProduit] = useState('')
  const [idCategorie, setIdCategorie] = useState('')

  const changeNomProduit = (e) => {
    setNomProduit(e.target.value)
  }

  const changePrixMetre = (e) => {
    setPrixMetre(e.target.value)
  }

  const changeDescription = (e) => {
    setDescription(e.target.value)
  }

  const changeHauteur = (e) => {
    setHauteur(e.target.value)
  }

  const changeEpaisseur = (e) => {
    setEpaisseur(e.target.value)
  }

  const changeMarge = (e) => {
    setMarge(e.target.value)
  }

  const changeMasseLineaire = (e) => {
    setMasseLineaire(e.target.value)
  }

  const changeTVA = (e) => {
    setTVA(e.target.value)
  }

  const changeReferenceProduit = (e) => {
    setReferenceProduit(e.target.value)
  }

  const changeCategorie = (e) => {
    setIdCategorie(e.target.value)
  }

  const handleImagePrincipaleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImagePrincipale(selectedFiles[0]);
  };

  const handleImage1Change = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImage1(selectedFiles[0]);
  };

  const handleImage2Change = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImage2(selectedFiles[0]);
  };


  const submit = (e) => {

    const formData = new FormData();
    // ajouter les fichiers images ici
    formData.append('imagePrincipale', imagePrincipale);
    formData.append('image1', image1);
    formData.append('image2', image2);
    

    // ajouter le reste des informations sur le produit
    formData.append('nomProduit', nomProduit)
    formData.append('prixMetre', prixMetre)
    formData.append('description', description)
    formData.append('hauteur', hauteur)
    formData.append('epaisseur', epaisseur)
    formData.append('marge', marge) 
    formData.append('masseLineaire', masseLineaire)
    formData.append('tva', tva)
    formData.append('referenceProduit', referenceProduit)
    formData.append('idCategorie', idCategorie)

    axios.post('http://localhost:5000/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        window.location.href = '/dashboard/produits';
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setErrors({ global: "A storage error triggered" });
        }
      }).finally(() => {
        
      })
  }


  const getCategories = () => {
    axios.get(`http://localhost:5000/categories/`
    )
      .then((res) => {
        setCategories(res.data.data)
        setIsLoaded(true)
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    getCategories()
  }, [])

  if(!isLoaded) return ("Loading")
  return (
    <div className="rounded w-4/5 p-5 flex">
      <div class="w-full p-5">
      <h2 class="text-2xl font-bold mb-4">Nouvel article</h2>

        <form class="bg-white p-6 rounded w-full">
        <div class="grid grid-cols-2 gap-10">
  <div>
          
          <div class="mb-5">
        <label for="nomProduit" class="block text-sm font-medium text-gray-700">Nom produit</label>
        <input type="text" id="nomProduit" onChange={changeNomProduit} value={nomProduit} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir nom produit" required />
    </div>
    <div class="mb-5">
        <label for="prixMetre" class="block text-sm font-medium text-gray-700">Prix mêtre linéaire</label>
        <input type="number" id="prixMetre" onChange={changePrixMetre} value={prixMetre} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir le prix" required />
    </div>
    <div class="mb-5">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" onChange={changeDescription} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3" placeholder="Saisir la description produit" required></textarea>
    </div>
    <div class="mb-5">
        <label for="imagePrincipale" class="block text-sm font-medium text-gray-700">Image principale</label>
        <input type="file" onChange={handleImagePrincipaleChange} id="imagePrincipale" name="imagePrincipale" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Sélectionner une image" required />
    </div>
    <div class="mb-5">
        <label for="image1" class="block text-sm font-medium text-gray-700">Image 1</label>
        <input type="file"  onChange={handleImage1Change} id="image1" name="image1" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Sélectionner une image" />
    </div>
    <div class="mb-10">
        <label for="image2" class="block text-sm font-medium text-gray-700">Image 2</label>
        <input type="file" onChange={handleImage2Change} id="image2" name="image2" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Sélectionner une image" />
    </div>
    <a href="#" class="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => submit()}>Enregistrer</a>
    </div>
  <div>
    <div class="mb-5">
        <label for="hauteur" class="block text-sm font-medium text-gray-700">Hauteur</label>
        <input type="number" onChange={changeHauteur} value={hauteur} id="hauteur" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir la héauteur" required />
    </div>
    <div class="mb-5">
        <label for="epaisseur" class="block text-sm font-medium text-gray-700">Epaisseur</label>
        <input type="number" onChange={changeEpaisseur} value={epaisseur} id="epaisseur" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir l'épaisseur" required />
    </div>
    <div class="mb-5">
        <label for="marge" class="block text-sm font-medium text-gray-700">Marge</label>
        <input type="number" onChange={changeMarge} value={marge} id="marge" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir la marge" required />
    </div>
    <div class="mb-5">
        <label for="masseLineaire" class="block text-sm font-medium text-gray-700">Masse linéaire</label>
        <input type="number" onChange={changeMasseLineaire} value={masseLineaire} id="masseLineaire" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir la masse linéaire" required />
    </div>
    <div class="mb-5">
        <label for="tva" class="block text-sm font-medium text-gray-700">Taux TVA (%)</label>
        <input type="number" onChange={changeTVA} value={tva} id="tva" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir le taux TVA" required />
    </div>
    <div class="mb-5">
        <label for="referenceProduit" class="block text-sm font-medium text-gray-700">Référence produit</label>
        <input type="text" onChange={changeReferenceProduit} value={referenceProduit} id="referenceProduit" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Saisir la référence produit" required />
    </div>
    <div class="mb-10">
        <label for="idCategorie" class="block text-sm font-medium text-gray-700">Catégorie</label>
        <select id="idCategorie" onChange={changeCategorie} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option value={""} selected>Veuillez sélectionner</option>
        {categories.map((cat) => (
           <option value={cat.idCategorie}>{cat.nomCategorie}</option>
        ))}
        </select>
    </div>

         
          </div>
</div>
        </form>
      </div>
    </div>
  );
}

export default ProductDashboard;

