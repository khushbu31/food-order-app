import { Fragment } from "react";
import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCart from "./HeaderCart";

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCart onClick={props.onCartClick}></HeaderCart>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="A table of delecious food!" />
        </div>
    </Fragment>
}
export default Header;