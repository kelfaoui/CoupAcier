import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from "../context/cart"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Cart ({showModal, toggle}) {

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
  const notifyRemovedFromCart = (item) => toast.error(`${item.title} removed from cart!`, {
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

  const notifyCartCleared = () => toast.error(`Cart cleared!`, {
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
      client_id: 1,
      order_date: null,
      order_total: myTotal,
      state: 1,
    }
    if (cartItems.length === 0) {
      alert("Panier vide")
      return;
    }

    axios.post(`http://localhost:5000/orders/`, order)
      .then(res => {
        console.log(res);
        console.log(res.data.OrderId);
        console.log(cartItems);
        cartItems.map(item => {
          const prod = data.data.find((p) => p.idProduit === item.id)
          if (prod) {
            const ProductOrder = {
              order_id: res.data.OrderId,
              product_id: prod.product_id,
              nbr: item.quantity,
              applied_price: prod.price,
              ingerdients: item.ingredients || '',
              product_name: prod.name
            }
            axios.
              post(
                "http://localhost:5000/productOrders/", ProductOrder
              ).then((res) => {
                setData(res.data)
                console.log(res.data)
              })
              .catch((err) => console.log(err))
              .finally(() => setLoading(false))
          }
        })
        window.location.href = "/checkin"
      })
    clearCart()
  }



  return (
    showModal && (
      <div className="flex-col flex items-center fixed inset-0 left-1/4 bg-white dark:bg-black gap-8  p-10  text-black dark:text-white font-normal uppercase text-sm z-index-top">
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

