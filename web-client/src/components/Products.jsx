import { useState, useEffect, useContext } from 'react'
import { CartContext } from "../context/cart"
import Cart from './Cart.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
  const [showModal, setshowModal] = useState(false);
  const [products, setProducts] = useState([])
  const { cartItems, addToCart , removeFromCart} = useContext(CartContext)

  const toggle = () => {
    setshowModal(!showModal);
  };

  async function getProducts() {
    const response = await fetch('http://127.0.0.1:5000/products')
    const data = await response.json()
    setProducts(data.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const notifyAddedToCart = (item) => toast.success(`${item.nomProduit} ajouté au panier !`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#fff',
      color: '#000',
    }
    });

  const notifyRemovedFromCart = (item) => toast.error(`${item.nomProduit} retiré du panier !`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff',
    }
    });

    const handleRemoveFromCart = (product) => {
      removeFromCart(product);
      notifyRemovedFromCart(product);
    };

  return (
    <div className='flex flex-col justify-center bg-white pb-10 mb-0'>
      <ToastContainer />
      <div className='flex justify-between items-center px-20 py-5'>
      <h2 className="text-2xl font-bold tracking-tight text-black  main-h2 inline-block mx-auto"><span>Choisir la découpe</span></h2>
        {!showModal && <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
          onClick={toggle}
        >Panier ({cartItems.length})</button>}
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
        {
          products.map(product => (
            <div key={product.id} className='bg-white shadow-md rounded-lg px-5 py-5'>
              <img src={"http://localhost:5000/public/" + product.imagePrincipale} alt={product.nomProduit} className='rounded-md h-48' />
              <div className='mt-4'>
                <h1 className='text-lg uppercase font-bold'>{product.nomProduit}</h1>
                <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 40)}...</p>
                <p className='mt-2 text-gray-600'>{product.prixMetre} €</p>
              </div>
              <div className='mt-6 flex justify-between items-center'>
                {
                  !cartItems.find(item => item.id === product.idProduit) ? (
                    <button className='w-full px-2 py-2 bg-yellow-300 text-black rounded-full text-xs font-bold uppercase hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                      onClick={() => {
                        addToCart(product)
                        notifyAddedToCart(product)
                      }
                      }
                      >
                       Choisir et passer à la découpe
                      </button>
                  ) : (
                    <div className="flex gap-4">
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => {
                        addToCart(product)
                      }}
                    >
                      +
                    </button>
                    <p className='text-gray-600'>{cartItems.find(item => item.id === product.idProduit).quantity}</p>
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => {
                        const cartItem = cartItems.find((item) => item.id === product.idProduit);
                        if (cartItem.quantity === 1) {
                          handleRemoveFromCart(product);
                        } else {
                          removeFromCart(product);
                        }
                      }}
                    >
                      -
                    </button>
                  </div>
                  )
                }
              </div>
            </div>
          ))
        }
      </div>
      <Cart showModal={showModal} toggle={toggle} />
    </div>
  )
}
