import React from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
    const cartItems = [{ id: 'c1', name: 'sushi', price: 12.99 }].map((item) => <li key={item.id}>{item.name}</li>);
    return (
        <Modal onClose={props.onCartClick}>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.65</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCartClick}>Close </button>
                <button className={classes.button}>Close </button>
            </div>

        </Modal>
    )
}

export default Cart;