import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './forms/Login';
import Register from './forms/Register';
import {Route, Switch, useLocation} from "react-router-dom";
import AuthorInfo from './components/AuthorInfo';
import Product from './pages/Product';
import Category from './pages/Category';
import Cart from "./components/Cart";
import { useEffect } from 'react';
import Authors from './pages/Authors';

function App() {

  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname])

  return (
    <Switch>
      <Route exact path='/' children={<Home />} />
      <Route path='/about' children={<About />} />
      <Route path='/contact' children={<Contact />} />
      <Route path='/login' children={<Login />}/>
      <Route path='/register' children={<Register />}/>
      <Route exact path='/authors' children={<Authors />} />
      <Route path='/authors/:slug' children={<AuthorInfo />} />
      <Route exact path='/books/:slug' children={<Product />} />
      <Route path='/categories/:slug' children={<Category />} />
      <Route path='/cart' children={<Cart />} />
    </Switch>
  );
}

export default App;