import { useState, useEffect, useContext } from 'react'
import { CartContext } from "../context/cart"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../components/Cart';

function MyCart () {
    
    const [showModal, setshowModal] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:5000/csrf-token')
          .then(response => {
            axios.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken;
          })
          .catch(error => {
            console.error('Error fetching CSRF token:', error);
          });
      }, []);

    return(
        <Cart showModal={showModal} toggle={true} />
    )
}

export default MyCart;