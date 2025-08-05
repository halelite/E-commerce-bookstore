import "./App.css";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Authors from "./pages/Authors";
import AuthorInfo from "./pages/AuthorInfo";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import { Bounce, ToastContainer } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Books from "./pages/Books.jsx";
import ProductInfo from "./pages/ProductInfo";
import BestSellerBooks from "./pages/BestSellerBooks.jsx";
import NewBooks from "./pages/NewBooks.jsx";

function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/authors" element={<Authors />} />
				<Route path="/authors/:slug" element={<AuthorInfo />} />
				<Route path="/books/best-sellers" element={<BestSellerBooks />} />
				<Route path="/books/new" element={<NewBooks />} />
				<Route path="/books/:slug" element={<ProductInfo />} />
				<Route path="/categories/:slug" element={<Category />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/books" element={<Books />} />
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				rtl
				theme="colored"
				transition={Bounce}
			/>
		</>
	);
}

export default App;
