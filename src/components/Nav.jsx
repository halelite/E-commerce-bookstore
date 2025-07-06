import Searchbar from "./Searchbar";
import logo from "../assets/images/logo.png";
import cartLogo from "../assets/icons/shopping_cart_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import { useContext, useEffect, useRef, useState } from "react";
import menu from "../assets/icons/menu_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import close from "../assets/icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import PagesSection from "./PagesSection";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";

function Nav() {
	const navigate = useNavigate();
	const ref = useRef();
	const [menuActive, setMenuActive] = useState(false);
	const { cart } = useCart();
	const { isAuthenticated, logout } = useAuth();

	console.log("is Authenticated: ", isAuthenticated);

	useEffect(() => {
		ref.current.innerHTML = cart.length;
		if (ref.current.innerHTML == 0) {
			ref.current.style.display = "none";
		} else {
			ref.current.style.display = "block";
		}
	}, [cart]);

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<>
			<div className="navbar">
				<div
					className="menu-icon"
					onClick={() => setMenuActive((curr) => !curr)}
				>
					{!menuActive ? (
						<img id="menu" src={menu} alt="menu" />
					) : (
						<img id="close-menu" src={close} alt="close" />
					)}
				</div>
				<div className="logo">
					<img src={logo} alt="logo" />
				</div>

				<Searchbar />

				<div className="account">
					{isAuthenticated ? (
						<Link to="/profile">پروفایل</Link>
					) : (
						<div className="sign-in-up">
							<Link to="/login">ورود | ثبت‌نام</Link>
						</div>
					)}
					<div className="cart">
						<span className="num" ref={ref}></span>
						<Link to="/cart">
							<img src={cartLogo} alt="cart" />
						</Link>
					</div>
					{isAuthenticated && (
						<div className="logout" onClick={handleLogout}>
							logout
						</div>
					)}
				</div>
			</div>
			<PagesSection active={menuActive} />
		</>
	);
}

export default Nav;
