import Searchbar from "./Searchbar";
import logo from "../assets/images/logo.png";
import cartLogo from "../assets/icons/shopping_cart_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import { useRef, useState, useLayoutEffect } from "react";
import menu from "../assets/icons/menu_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import close from "../assets/icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import user from "../assets/icons/person_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import PagesSection from "./PagesSection";
import { Link, useLocation, useNavigate } from "react-router";
import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";

function Nav() {
	const navigate = useNavigate();
	const location = useLocation();
	const ref = useRef();
	const menuToggleButton = useRef(null);
	const [menuActive, setMenuActive] = useState(false);
	const { cart, syncCart } = useCart();
	const { isAuthenticated, logout, loading } = useAuth();

	useLayoutEffect(() => {
		if (isAuthenticated && !loading) {
			const token = localStorage.getItem("token");
			const guestId = localStorage.getItem("guestId");
			const guestCart = JSON.parse(localStorage.getItem(`cart_${guestId}`));
			if (guestCart && guestCart.length > 0) {
				console.log("Syncing guest cart for user:");
				syncCart(token);
			}
		}
	}, [isAuthenticated, loading, syncCart]);

	useLayoutEffect(() => {
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
				<div className="menu-log-wrapper">
					<div
						ref={menuToggleButton}
						className="menu-icon"
						onClick={() => setMenuActive((curr) => !curr)}
					>
						{!menuActive ? (
							<img id="menu" src={menu} alt="menu" />
						) : (
							<img id="close-menu" src={close} alt="close" />
						)}
					</div>
					<div className="logo" onClick={() => navigate("/")}>
						<img src={logo} alt="logo" />
					</div>
				</div>

				<Searchbar />

				<div className="account">
					{isAuthenticated ? (
						<Link to="/profile">
							<img
								className="profile"
								src={user}
								title="پروفایل"
								alt="profile"
							/>
						</Link>
					) : (
						<div className="sign-in-up">
							<Link to="/login" state={{ from: location.pathname }}>
								ورود | ثبت‌نام
							</Link>
						</div>
					)}
					<div className="cart">
						<span className="num" ref={ref}></span>
						<Link to="/cart">
							<img title="سبد خرید" src={cartLogo} alt="cart" />
						</Link>
					</div>
					{isAuthenticated && (
						<div className="logout" onClick={handleLogout}>
							خروج
						</div>
					)}
				</div>
			</div>
			<PagesSection
				active={menuActive}
				closeMenu={() => setMenuActive(false)}
				menuToggleButton={menuToggleButton}
			/>
		</>
	);
}

export default Nav;
