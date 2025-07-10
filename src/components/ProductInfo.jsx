import { useEffect, useRef, useState, useLayoutEffect } from "react";
import plus from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import minus from "../assets/icons/remove_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import trash from "../assets/icons/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import { useCart } from "../context/cart-context";
import { useParams } from "react-router";

function ProductInfo() {
	const { cart, addToCart, editCartItem, deleteCartItem } = useCart();
	const { slug } = useParams();
	const [book, setBook] = useState({});
	const [quantity, setQuantity] = useState(0);

	function handleIncrease() {
		// let c = parseInt(ref.current.innerHTML, 10);
		// c++;
		// ref.current.innerHTML = c;
		setQuantity((prev) => prev + 1);
		editCartItem(book._id, quantity + 1);
	}

	function handleDecrease() {
		// let c = parseInt(ref.current.innerHTML, 10);
		// if (c !== 0) {
		// 	c--;
		// 	ref.current.innerHTML = c;
		// }
		if (quantity === 1) {
			deleteCartItem(book._id);
			setQuantity(0);
		} else if (quantity > 1) {
			setQuantity((prev) => prev - 1);
			editCartItem(book._id, quantity - 1);
		}
	}

	async function handleAddToCart(bookData) {
		await addToCart(bookData);
		setQuantity(1);
		/* const quantity = parseInt(ref.current.innerHTML, 10);

		if (cart.length > 0) {
			for (const book of cart) {
				if (book.bookId === bookData._id) {
					if (quantity === 0) {
						console.log("0");
						await deleteCartItem(bookData._id);
					} else {
						await editCartItem(bookData._id, quantity);
					}
					return;
				} else {
					await addToCart(bookData);
				}
			}
		} else {
			console.log("not in condition");

			if (quantity > 0) {
				await addToCart(bookData, quantity);
			}
		} */
	}

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/books/${slug}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error(res.status);
				}
			})
			.then((data) => {
				setBook(data);
			})
			.catch((err) => console.log(err));
	}, []);

	useLayoutEffect(() => {
		if (cart.length > 0) {
			const existingBook = cart.find((item) => item.bookId === book._id);
			if (existingBook) {
				// let bookQuantity = existingBook.quantity;
				// ref.current.innerHTML = bookQuantity;
				setQuantity(existingBook.quantity);
			} else {
				// ref.current.innerHTML = 0;
				setQuantity(0);
			}
		} else {
			// ref.current.innerHTML = 0;
			setQuantity(0);
		}
	}, [cart, book]);

	return (
		book && (
			<div className="product-info">
				<div className="product-wrap">
					<img
						className="product-img"
						src={`${import.meta.env.VITE_API_URL}${book?.image}`}
						alt="product image"
					/>
					<div className="productInfo-wrap">
						<h2>
							<span>نام کتاب:</span> {book.title}
						</h2>
						<h2>
							<span>نام نویسنده:</span>{" "}
							{book.author && <p>{book.author.join(", ")}</p>}
						</h2>
						<h2>
							<span>دسته بندی:</span>
							{book.category && <p>{book.category.join(", ")}</p>}
						</h2>
						{book.price && (
							<h2 className="price">
								{book.price.toLocaleString()} <span>تومان</span>
							</h2>
						)}
						<div className="add-to-cart">
							{quantity === 0 ? (
								<button onClick={() => handleAddToCart(book)} type="button">
									افزودن به سبد خرید
								</button>
							) : (
								<div className="change-count">
									<div onClick={handleIncrease} className="increase">
										<img src={plus} alt="plus" />
									</div>
									<div className="number">
										<span>{quantity}</span>
									</div>
									<div onClick={handleDecrease} className="decrease">
										{quantity === 1 ? (
											<img className="delete" src={trash} alt="trash" />
										) : (
											<img src={minus} alt="minus" />
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<span id="describe">معرفی کتاب:</span>
				<p className="book-description">{book.description}</p>
			</div>
		)
	);
}

export default ProductInfo;
