import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.idProduit === item.idProduit);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.idProduit === item.idProduit
            ? { ...cartItem, quantity: cartItem.quantity + 1, dimensionCoupe: item.dimensionCoupe }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, dimensionCoupe: 0 }]);
    }
  };

  const updateCut = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.idProduit === item.idProduit);
    if (isItemInCart) {
      console.log(item)
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.idProduit === item.idProduit
            ? { ...cartItem, dimensionCoupe: item.dimensionCoupe }
            : cartItem
        )
      );
    } else {
      
      setCartItems([...cartItems, { ...item, dimensionCoupe: 0 }]);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.idProduit === item.idProduit);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.idProduit !== item.idProduit));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.idProduit === item.idProduit
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.prixMetre * item.quantity, 0);
  };

  useEffect(() => {
    const data = localStorage.getItem('cartItems');
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]); 

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        updateCut
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};