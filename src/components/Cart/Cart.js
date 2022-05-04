import React, { useContext } from 'react';
import { CartContext } from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const onAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }
    const removeHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItems = cartCtx.items.map((item) =>
        <CartItem
            key={item.id}
            item={item}
            onRemove={removeHandler.bind(null, item.id)}
            onAdd={onAddHandler.bind(null, item)}>
            {item.name}
        </CartItem>);

    return (
        <Modal onClose={props.onCartClick}>
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
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCartClick}>Close </button>
                {cartCtx.items.length && <button className={classes.button}>Order</button>}
            </div>

        </Modal>
    )
}

export default Cart;