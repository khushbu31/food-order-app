import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCart.module.css";

const HeaderCart = (props) => {
    const cartCtx = useContext(CartContext);
    const [buttonHighlighted, setbuttonHighlighted] = useState(false)
    const noOfItems = cartCtx.items.reduce((curNo, item) => { return curNo + item.amount }, 0)

    const btnClasses = `${classes.button} ${buttonHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (!cartCtx.items.length) {
            return;
        }
        setbuttonHighlighted(true);
        const timer = setTimeout(() => { setbuttonHighlighted(false); }, 300)
        return () => {
            clearTimeout(timer);
        }
    }, [cartCtx.items])


    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon /></span>
        <span >Your cart</span>
        <span className={classes.badge}>{noOfItems}</span>
    </button>
}

export default HeaderCart;