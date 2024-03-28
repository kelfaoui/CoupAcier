import { useState, React } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { LockOpenIcon } from "@heroicons/react/24/outline";

function Login() {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   // Définir un tableau pour les erreurs
   const [formErrors, setFormErrors] = useState({})
   const navigate = useNavigate()

   const changeEmail = (e) => {
    setEmail(e.target.value)
   }

   const changePassword = (e) => {
    setPassword(e.target.value)
   }

   const onSubmit = (e) => {
    e.preventDefault();
    const errors = {}

    // Validation de l'émail
    if (!email.trim())
        errors.email = "Veuillez renseigner votre email"
    else if (!validateEmail(email.trim()))
        errors.email = "Email incorrect"

    // Validate du mot de passe
    if (!password.trim())
        errors.password = "Veuillez renseigner le mot de passe"
    else if (password.trim().length < 1)
        errors.password = "Le mot de passe est trop court"

    // Enregistrer les erreurs
    setFormErrors(errors);

    if (Object.keys(formErrors).length === 0)
         Login()
  }

  const validateEmail = (email) => {
    // Expression régulière simple pour une adresse email
    const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return String(email)
        .toLowerCase()
        .match(
            regExp
        );
  };

  const Login = () => {
    axios.post("${process.env.REACT_APP_API_LINK}/auth/login", {
        email: email,
        password: password
    }, {
      // Include cookies in the request
      withCredentials: true
    }).then((res) => {
      localStorage["email"] = res.data.email
      localStorage['user_id'] = res.data._id
      window.location.href = "/"
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div style={{
      backgroundImage: `url("/register-bg.jpg")`,
      backgroundSize: 'cover'
    }}>
    <div className="flex items-center justify-center h-screen">
      
      <div className="w-1/4 basis text-left">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto py-30 glass-morphism" onSubmit={onSubmit}>
        <h1 className="text-md text-center mb-4">Bienvenue sur <span className="font-bold">Coup'Acier</span></h1>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm mb-2"
              for="username"
            >
              Username
            </label>
            <input
              className="login-input shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e)=>changeEmail(e)}
            ></input>
             {formErrors.email && <span className="text-white font-light"> {formErrors.email} </span>}
          </div>
          <div className="mb-6">
          <label
              className="block text-gray-400 text-sm mb-2"
              for="username"
            >
              Password
            </label>
            <input
              className="text-gray-700 login-input first-line:shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e)=>changePassword(e)}
            ></input>
            {formErrors.password && <span className=" font-light"> {formErrors.password} </span>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-700 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline flex w-full justify-center"
              type="submit"
            >
              Connexion
            </button>
          </div>
          <div className="flex items-center justify-between pt-5">
          <a
              className="inline-block align-baseline text-sm text-gray-700 hover:text-gray-300"
              href="#"
            >
              Mot de passe oublié ?
            </a>
            <a
              className="inline-block align-baseline  text-sm text-gray-700 hover:text-gray-300"
              href="/register"
            >
              Créer un compte
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy; 2023/2024 Coup'Acier, tous droits réservés
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;

































