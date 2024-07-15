import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from "../context/cart"
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

var orderId = 0

export default function Cart({ showModal, toggle }) {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, updateCut } = useContext(CartContext)
  const notifyRemovedFromCart = (item) => toast.error(`${item.nomProduit} est retiré du panier!`, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff'
    }
  })

  const notifyCartCleared = () => toast.error(`Le panier a été vidé !`, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff'
    }
  })

  const handleRemoveFromCart = (product) => {
    removeFromCart(product)
    notifyRemovedFromCart(product)
  }

  const finalizeOrder = () => {
    const nbrElement = document.getElementById("number")

    const order = {
      statusCommande: 1,
      devis: 0,
      type: 1,
      dateLivraison: null,
      referenceLivraison: "123456789",
      ModeReception: 1,
      reference: String(Date.now()).substring(0, 10),
      idClient: 1,
      idLivreur: null,
      idAdresse: null
    }
    if (cartItems.length === 0) {
      alert("Panier vide")
      return;
    }

    axios.post(`http://localhost:5000/orders/`, order, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(res => {
        console.log(res);
        orderId = res.data.idCommande
        cartItems.map((item) => {
          const prod = data.data.find((p) => p.idProduit === item.idProduit)
          if (prod) {
            const ProductOrder = {
              dimensionCoupe: item.dimensionCoupe,
              quantite: item.quantity,
              ristourne: 0,
              prixMetre: item.prixMetre,
              idProduit: item.idProduit,
              idCommande: orderId
            }
            axios.
              post(
                "http://localhost:5000/product-orders/", ProductOrder, {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
              }
              ).then((res) => {
                setData(res.data)
                console.log(res.data)
              })
              .catch((err) => console.log(err))
              .finally(() => setLoading(false))
          }
        })
        window.location.href = "/produits"
      })
    clearCart()
  }

  const getProducts = () => {
    axios.
      get(
        "http://localhost:5000/products/"
      ).then((res) => {
        setData(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getProducts()
  }, [])

  return (
    showModal && (
      <div className="flex-col flex items-center fixed inset-0 left-1/4 bg-white dark:bg-black gap-8  p-10  text-black dark:text-white font-normal uppercase text-sm z-index-top overflow-y-scroll">
        <ToastContainer />
        <h1 className="text-2xl font-bold">Panier</h1>
        <div className="absolute right-16 top-10">
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Fermer
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <>

              <div className="flex justify-between items-center" key={item.id}>
                <div className="flex gap-4">
                  <img src={"http://localhost:5000/public/" + item.imagePrincipale} alt={item.title} className="rounded-md w-24 h-24" />
                  <div className="flex gap-8 justify-center">
                    <h1 className="text-lg font-bold">{item.nomProduit}</h1>
                    <p className="text-gray-600">{item.prixMetre} €</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="primary-bg-color first-letter:px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      addToCart(item)
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      const cartItem = cartItems.find((product) => product.id === item.id);
                      if (cartItem.quantity === 1) {
                        handleRemoveFromCart(item);
                      } else {
                        removeFromCart(item);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <label className="mx-3 w-1/2">Dimension coupe </label>
                <input type="text" className="text-gray-600 py-1 px-2 rounded w-1/2" value={item.dimensionCoupe}
                  onChange={(e) => {
                    const cartItem = cartItems.find((product) => product.id === item.id);

                    if (Number(e.target.value) < 6) {
                      item.dimensionCoupe = e.target.value
                      updateCut(item);
                    }
                  }}
                ></input>
              </div>
            </>
          ))}
        </div>
        {
          cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-lg font-bold">Total: {getCartTotal()} €</h1>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  clearCart()
                  notifyCartCleared()
                }}
              >
                Vider le panier
              </button>
            </div>
          ) : (
            <h1 className="text-lg font-bold">Le panier est vide</h1>
          )
        }
        <a href="#" onClick={() => finalizeOrder()} className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Envoyer le commande</a>
      </div>
    )
  )
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func
}