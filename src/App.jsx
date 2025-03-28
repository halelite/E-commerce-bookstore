import "./App.css";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Authors from "./pages/Authors";
import AuthorInfo from "./components/AuthorInfo";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Cart from "./components/Cart";
import { useEffect } from "react";

function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/authors" element={<Authors />} />
			<Route path="/authors/:slug" element={<AuthorInfo />} />
			<Route path="/books/:slug" element={<Product />} />
			<Route path="/categories/:slug" element={<Category />} />
			<Route path="/cart" element={<Cart />} />
		</Routes>
	);
}

export default App;
