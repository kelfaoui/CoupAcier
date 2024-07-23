import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/RegisterPart'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Clientss from './pages/dashboard/Clients'
import RegisterPart from './pages/RegisterPart'
import RegisterPro from './pages/RegisterPro'
import LoginPage from './pages/LoginPage'
import LoginPro from './pages/LoginPro'
import LoginPart from './pages/LoginPart'
import Devis from './pages/Devis'
import Favoris from './pages/Favoris'
import Product from './pages/Product'
import Produits from './pages/Produits'
import DashboardHome from './pages/dashboard/Home'
import Commandes from './pages/dashboard/Commandes'
import DashboardProduits from './pages/dashboard/Produits'
import DashboardDevis from './pages/dashboard/DashboardDevis'
import Fournisseurs from './pages/dashboard/Fournisseurs'
import DashboardCategories from './pages/dashboard/Categories'
import Entrepots from './pages/dashboard/Entrepots'
import DashboardRoles from './pages/dashboard/Roles' 
import Products from './components/Products'
import Fournisseur from './pages/dashboard/Fournisseur'
import Categorie from './pages/dashboard/Categorie'
import Entrepot from './pages/dashboard/Entrepot'
import ProductDashboard from './pages/dashboard/Product'
import DashboardEmployees from './pages/dashboard/Employes'
import DashboardEmployee from './pages/dashboard/Employee'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/produits" element={<Products />}></Route>
          <Route path="/register-part" element={<RegisterPart />}></Route>
          <Route path="/register-pro" element={<RegisterPro />}></Route>
          <Route path="/demande-de-devis" element={<Devis />}></Route>
          <Route path="/produit/:id" element={<Product />}></Route>
          <Route path="/favoris" element={<Favoris />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/login-part" element={<LoginPart />}></Route>
          <Route path="/login-pro" element={<LoginPro />}></Route>
        </Route>
        <Route path="/dashboard/" element={<DashboardLayout />}>
           <Route path="/dashboard/" element={<DashboardHome />}></Route>
          <Route path="/dashboard/produits" element={<DashboardProduits />}></Route>
          <Route path="/dashboard/clients" element={<Clientss />}></Route>
          <Route path="/dashboard/commandes" element={<Commandes />}></Route>
          <Route path="/dashboard/demandes-devis" element={<DashboardDevis />}></Route>
          <Route path="/dashboard/home" element={<DashboardHome />}></Route>
          <Route path="/dashboard/fournisseurs" element={<Fournisseurs />}></Route>
          <Route path="/dashboard/categories" element={<DashboardCategories />}></Route>
          <Route path="/dashboard/entrepots" element={<Entrepots />}></Route>
          <Route path="/dashboard/roles" element={<DashboardRoles />}></Route>
          <Route path="/dashboard/fournisseur" element={<Fournisseur />}></Route>
          <Route path="/dashboard/categorie" element={<Categorie />}></Route>
          <Route path="/dashboard/entrepot" element={<Entrepot />}></Route>
          <Route path="/dashboard/produit" element={<ProductDashboard />}></Route>
          <Route path="/dashboard/employes" element={<DashboardEmployees />}></Route>
          <Route path="/dashboard/employe" element={<DashboardEmployee />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App