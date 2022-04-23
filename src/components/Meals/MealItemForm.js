import React from 'react'
import { Input } from '../UI/Input';
import classes from './MealItemForm.module.css';
function MealItemForm(props) {
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
            <Input label="Amount" input={input}></Input>
            <button>+ Add</button>
        </form>
    )
}


export default MealItemForm
