import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.index === item.index);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.index === item.index
            ? { ...cartItem, quantity: cartItem.quantity + 1, dimensionCoupe: item.dimensionCoupe }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, dimensionCoupe: 1, index: cartItems.length + 1}]);
     
    }
  };

  const updateCut = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.index === item.index);
    console.log("Im here?")
    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.index === item.index
            ? { ...cartItem, dimensionCoupe: item.dimensionCoupe }
            : cartItem
        )
      );
    } else {
      
      setCartItems([...cartItems, { ...item, dimensionCoupe: 0 }]);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.index === item.index);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.index !== item.index));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.index === item.index
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
    return cartItems.reduce((total, item) => total + item.prixMetre * item.quantity * item.dimensionCoupe, 0);
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
