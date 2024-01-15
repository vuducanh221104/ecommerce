import React, { createContext, useContext, useEffect, useState } from 'react';
import { setLocalStorage } from '~/components/EncodeLocalStorage';
const CartContext = createContext();

export const QuantityProductCartProvider = ({ children }) => {
    const [quantityProductInCart, setQuantityProductInCart] = useState(0);

    const handleQuantityInCart = (changeAmount = 1) => {
        setQuantityProductInCart((prev) => prev + changeAmount);
    };

    useEffect(() => {
        setLocalStorage('quantityInCart', quantityProductInCart, 'quantityInCart');
    }, [quantityProductInCart]);

    return (
        <CartContext.Provider value={{ quantityProductInCart, setQuantityProductInCart, handleQuantityInCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useQuantityProductCart = () => {
    return useContext(CartContext);
};
