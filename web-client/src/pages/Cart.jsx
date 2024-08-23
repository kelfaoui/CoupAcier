import { useState, useEffect, useContext } from 'react'
import { CartContext } from "../context/cart"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../components/Cart';

function MyCart () {
    const [showModal, setshowModal] = useState(true);

    return(
        <Cart showModal={showModal} toggle={true} />
    )
}

export default MyCart;