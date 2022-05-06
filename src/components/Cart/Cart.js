import React, { Fragment, useContext, useState } from 'react';
import { CartContext } from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [showModalContent, setShowModalContent] = useState(true);
    const [isCheckout, setIsCheckout] = useState(false);
    const [statusData, setStatusData] = useState('')
    const onAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }
    const removeHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const orderClickHandler = () => {
        setIsCheckout(true);
    }

    const onOrderSubmit = async (userData) => {

        const rawResponse = await fetch('https://food-db-c9593-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                userData,
                orderedItems: cartCtx.items
            })
        });

        if (!rawResponse.ok) {
            setStatusData('Something went wrong');
            setShowModalContent(false);
        } else {
            setStatusData('Succesfully placed your order... Thank you...!!');
            setShowModalContent(false);
            cartCtx.clearCart();
        }

        const response = await rawResponse.json();
        console.log(response);
    }
    const cartItems = cartCtx.items.map((item) =>
        <CartItem
            key={item.id}
            item={item}
            onRemove={removeHandler.bind(null, item.id)}
            onAdd={onAddHandler.bind(null, item)}>
            {item.name}
        </CartItem>);
    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCartClick}>Close </button>
        {cartCtx.items.length && <button className={classes.button} onClick={orderClickHandler}>Order</button>}
    </div>
    return (
        <Modal onClose={props.onCartClick}>
            {showModalContent && <Fragment>
                <ul className={classes['cart-items']}>
                    {cartItems}
                    {/* <CartItem ></CartItem> */}
                    {/* <button className={classes['button--alt']} onClick={onRemoveHandler}>-</button> */}
                    {/* <button className={classes['button--alt']} onClick={onAddHandler}>+</button> */}
                </ul>
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{cartCtx.totalCount.toFixed(2)}</span>
                </div>

                {isCheckout && <Checkout onOrderSubmit={onOrderSubmit} onClose={props.onCartClick}></Checkout>}
                {!isCheckout && modalActions}

            </Fragment>}

            {!showModalContent && <Fragment>
                {statusData}
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onCartClick}>Close </button>
                </div>
            </Fragment>}
        </Modal>
    )
}

export default Cart; 