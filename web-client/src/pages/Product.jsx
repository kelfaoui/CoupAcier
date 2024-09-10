import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from "../context/cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../components/Cart';

export default function Product() {
  const [showModal, setshowModal] = useState(false);
  const [product, setProduct] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const toggle = () => setshowModal(!showModal);

  const addToFavorites = (idProduit, idClient) => {
    const tuple = { idProduit, idClient };
    axios.post(`http://localhost:5000/favoris/`, tuple, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  };

  const notifyAddedToCart = (item) => toast.success(`${item.nomProduit} ajouté au panier !`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: { backgroundColor: '#fff', color: '#000' }
  });

  const notifyRemovedFromCart = (item) => toast.error(`${item.nomProduit} retiré du panier !`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: { backgroundColor: '#000', color: '#fff' }
  });

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    notifyRemovedFromCart(product);
  };

  const getProduct = () => {
    axios.get('http://127.0.0.1:5000/products/' + id)
      .then(res => setProduct(res.data.data))
      .finally(() => setIsLoaded(true));
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!isLoaded) return "Loading..";

  return (
    <>
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-12">
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 my-10">
            {/* Product Image */}
            <div className="bg-gray-300 p-5 rounded-xl">
              <img
                src={`http://localhost:5000/public/${product.imagePrincipale}`}
                alt={product.nomProduit}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Product Info */}
            <div className="p-5 bg-white border-2 border-black rounded-xl">
              <h2 className="text-2xl font-bold">{product.nomProduit}</h2>
              <p className="text-xl mt-3"><i>PRIX TTC :</i> {product.prixMetre} €</p>

              {/* Quantity and Length */}
              <div className="mt-3 flex items-center">
                <p className="text-l font-bold"><i>QUANTITE :</i></p>
                <div className="ml-3 flex items-center border-2 border-black">
                  <button className="px-2 text-xl">-</button>
                  <input className="w-12 text-center border-2" value="1" readOnly />
                  <button className="px-2 text-xl">+</button>
                </div>
              </div>

              <div className="mt-3 flex items-center">
                <p className="text-l font-bold"><i>LONGUEUR EN CM :</i></p>
                <div className="ml-3 px-3 text-2xl bg-gray-400 border-2 border-black">1 cm</div>
              </div>

              {/* Availability */}
              <p className="text-l font-bold mt-3"><i>DISPONIBILITE :</i> <span className="text-green-600">Livraison sous 15 jours ouvrés</span></p>

              {/* Product Table */}
              <table className="border-2 w-full border-black mt-6">
                <caption className="bg-yellow-300 border border-black">Dimensions possibles</caption>
                <thead>
                  <tr>
                    <th className="border-2 border-black">Epaisseur (mm)</th>
                    <th className="border-2 border-black">Hauteur (mm)</th>
                    <th className="border-2 border-black">Largeur (mm)</th>
                    <th className="border-2 border-black">Masse linéaire (kg/m)</th>
                    <th className="border-2 border-black">Choix</th>
                  </tr>
                </thead>
                <tbody>
                  {[3, 4, 5, 6, 7].map((val) => (
                    <tr key={val}>
                      <td className="border-2 border-black">{val}</td>
                      <td className="border-2 border-black">{val * 10}</td>
                      <td className="border-2 border-black">{val * 10}</td>
                      <td className="border-2 border-black">{(val * 0.97).toFixed(2)}</td>
                      <td className="border-2 border-black"><input type="checkbox" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add to Cart and Favorites */}
              <div className="flex mt-6 gap-4">
                {
                  !cartItems.find(item => item.id === product.idProduit) ? (
                    <button
                      className="w-full bg-yellow-300 text-black py-2 rounded-full"
                      onClick={() => {
                        addToCart(product);
                        notifyAddedToCart(product);
                      }}>
                      Choisir et passer à la découpe
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-gray-800 text-white" onClick={() => addToCart(product)}>+</button>
                      <p className="text-lg">{cartItems.find(item => item.id === product.idProduit).quantity}</p>
                      <button className="px-4 py-2 bg-gray-800 text-white" onClick={() => handleRemoveFromCart(product)}>-</button>
                    </div>
                  )
                }
                <button
                  onClick={() => addToFavorites(product.idProduit, localStorage["user_id"])}
                  className="w-full bg-yellow-300 text-black py-2 rounded-full">
                  Ajouter au favoris
                </button>
              </div>
            </div>
          </section>
        </div>

        <Cart showModal={showModal} toggle={toggle} />
        <ToastContainer />
      </main>
    </>
  );
}
