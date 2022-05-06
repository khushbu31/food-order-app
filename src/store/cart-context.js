import React, { useReducer } from 'react';

export const CartContext = React.createContext({
    items: [],
    totalCount: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});

const defaultCartState = {
    items: [],
    totalAmount: 0

}

const cartReducer = (state, actions) => {
    if (actions.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + actions.payload.price * actions.payload.amount;
        const existItemIndex = state.items.findIndex((item) => item.id === actions.payload.id);
        const existItem = state.items[existItemIndex];
        let updatedItems;

        if (existItem) {
            const updateItem = {
                ...existItem,
                amount: existItem.amount + actions.payload.amount
            }
            updatedItems = [...state.items];
            updatedItems[existItemIndex] = updateItem;
        } else {
            updatedItems = state.items.concat(actions.payload);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (actions.type === 'REMOVE_ITEM') {
        const existItemIndex = state.items.findIndex((item) => item.id === actions.payload);
        const existItem = state.items[existItemIndex];
        const updatedTotalAmount = state.totalAmount - existItem.price;
        let updatedItems;
        if (existItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== actions.payload);
        } else {
            const updateItem = { ...existItem, amount: existItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existItemIndex] = updateItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (actions.type === 'REMOVE_ALL') {
        return defaultCartState;
    }
    return defaultCartState;
}

const CartContextProvider = (props) => {

    const [cartState, updateCartState] = useReducer(cartReducer, defaultCartState,)

    const addItemHandler = (item) => {
        updateCartState({ type: 'ADD_ITEM', payload: item });
    }
    const removeItemHandler = (id) => {
        updateCartState({ type: 'REMOVE_ITEM', payload: id });
    }

    const clearCart = () => {
        updateCartState({ type: 'REMOVE_ALL' });
    }
    const cartContex = {
        items: cartState.items,
        totalCount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart
    };


    return (
        <CartContext.Provider value={{ ...cartContex }}>{props.children}</CartContext.Provider>
    )
}

export default CartContextProvider

