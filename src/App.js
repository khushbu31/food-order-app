import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartContextProvider from './store/cart-context';

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const showCartHandler = () => {
    setIsCartVisible(!isCartVisible)
  }
  return (
    <CartContextProvider>
      {isCartVisible && <Cart onCartClick={showCartHandler}></Cart>}
      <Header onCartClick={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartContextProvider>
  );
}

export default App;
