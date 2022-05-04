import React, { useRef } from 'react';
import { Input } from '../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
    const amountInputRefHandler = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const amount = amountInputRefHandler.current.value;
        const enteredAmountNumber = +amount;
        console.log(amount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5);
        if (amount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            console.log('Plaese enter valid data');
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }
    const input = {
        id: 'amount' + props.id,
        type: 'text',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
    }
    return (
        <form className={classes.form}>
            <Input ref={amountInputRefHandler} label="Amount" input={input}></Input>
            <button onClick={submitHandler}>+ Add </button>
        </form>
    )
}


export default MealItemForm
