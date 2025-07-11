import { useEffect, useRef, useLayoutEffect } from "react";
import Layout from "../components/Layout";
import plus from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import minus from "../assets/icons/remove_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";

function Cart() {
	const { cart, editCartItem, deleteCartItem, syncCart } = useCart();
	const { isAuthenticated, loading, user } = useAuth();
	const navigate = useNavigate();
	const fullPriceRef = useRef();

	console.log("cart >>>", cart);

	useLayoutEffect(() => {
		if (isAuthenticated && !loading) {
			const token = localStorage.getItem("token");
			const guestId = localStorage.getItem("guestId");
			const guestCart = JSON.parse(localStorage.getItem(`cart_${guestId}`));
			if (guestCart && guestCart.length > 0) {
				console.log("Syncing guest cart for user:", user?.email);
				syncCart(token);
			}
		}
	}, [isAuthenticated, loading, syncCart, user]);

	useEffect(() => {
		let fullPrice = 0;
		if (cart.length > 0) {
			fullPrice = cart.reduce(
				(total, item) => total + item.quantity * item.price,
				0
			);

			/* for (let i = 0; i < cart.length; i++) {
				fullPrice += cart[i].quantity * cart[i].price;
			} */
		}
		if (fullPriceRef.current) {
			fullPriceRef.current.innerHTML = fullPrice.toLocaleString();
		}
	}, [cart]);

	const handleIncrease = async (bookId) => {
		const item = cart.find((item) => item.bookId === bookId);
		if (!item) return;
		const newQuantity = item.quantity + 1;
		await editCartItem(bookId, newQuantity);
	};

	const handleDecrease = async (bookId) => {
		const item = cart.find((item) => item.bookId === bookId);
		if (!item) return;
		const newQuantity = item.quantity - 1;
		if (newQuantity === 0) {
			await deleteCartItem(bookId);
		} else await editCartItem(bookId, newQuantity);
	};

	const handleCheckout = () => {
		if (isAuthenticated) {
			console.log("navigate to checkout");
		} else {
			navigate("/login");
		}
	};

	const renderSkeletonItem = () => (
		<li className="skeleton-item">
			<div className="book-shopped">
				<Skeleton width={80} height={120} />
				<div className="shop-info">
					<Skeleton width={150} height={20} />
					<Skeleton width={100} height={16} />
				</div>
			</div>
			<div className="price-info">
				<div className="change-count">
					<Skeleton width={30} height={30} />
					<Skeleton width={30} height={20} />
					<Skeleton width={30} height={30} />
				</div>
				<Skeleton width={80} height={20} />
			</div>
		</li>
	);

	let boughtItems = "";
	if (cart.length > 0) {
		boughtItems = cart.map((book) => {
			const itemCount = book.quantity;
			const itemPrice = (book.price * itemCount).toLocaleString();
			return (
				<li className={`li-${book.bookId}`} key={book.bookId}>
					<div className="book-shopped">
						<img
							src={`${import.meta.env.VITE_API_URL}${book.image}`}
							alt="book"
						/>
						<div className="shop-info">
							<p>{book.title}</p>
							<p>{book.author}</p>
						</div>
					</div>
					<div className="price-info">
						<div className="change-count">
							<div
								onClick={() => handleIncrease(book.bookId)}
								className="increase"
							>
								<img src={plus} alt="plus" />
							</div>
							<div className="number">
								<span className={`item${book.bookId}`}>{itemCount}</span>
							</div>
							<div
								onClick={() => handleDecrease(book.bookId)}
								className="decrease"
							>
								<img src={minus} alt="minus" />
							</div>
						</div>
						<p className={"price"}>
							{itemPrice} <span>تومان</span>
						</p>
					</div>
				</li>
			);
		});
	}

	return (
		<Layout>
			<div className="carts-section">
				<p>سبد خرید</p>
				<div className="main-cart">
					{/* <ul>{boughtItems ? boughtItems : "سبد خرید شما خالی است."}</ul>
					<div className="final-check">
						<p>
							قیمت کل:
							<span ref={fullPriceRef} className="full-price"></span>
							<span className="currency">تومان</span>
						</p>
						<button type="button" onClick={handleCheckout}>
							پرداخت
						</button>
					</div> */}

					{loading ? (
						<>
							<ul>
								{Array(3)
									.fill()
									.map((_, index) => (
										<div key={index}>{renderSkeletonItem()}</div>
									))}
							</ul>
							<Skeleton width={250} height={150} className="final-check" />
						</>
					) : (
						<>
							<ul>{boughtItems ? boughtItems : "سبد خرید شما خالی است."}</ul>
							<div className="final-check">
								<p>
									قیمت کل:
									<span ref={fullPriceRef} className="full-price"></span>
									<span className="currency">تومان</span>
								</p>
								<button type="button" onClick={handleCheckout}>
									پرداخت
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
}

export default Cart;
