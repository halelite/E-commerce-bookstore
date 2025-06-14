import { useContext, useEffect, useRef, useState } from "react";
import { images } from "../assets/images";
import plus from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import minus from "../assets/icons/remove_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { GlobalContext } from "../context/auth-context";
import { useParams } from "react-router";

function ProductInfo() {
	const { state, dispatch } = useContext(GlobalContext);
	const { slug } = useParams();
	const ref = useRef();
	const [book, setBook] = useState({});

	function handleIncrease() {
		let c = ref.current.innerHTML;
		c++;
		ref.current.innerHTML = c;
	}

	function handleDecrease() {
		let c = ref.current.innerHTML;
		if (c != 0) {
			c--;
			ref.current.innerHTML = c;
		}
	}

	function handleAddToCart(bookData) {
		if (state.bookCount.length > 0) {
			state.bookCount.map((book) => {
				if (book.title == bookData.title) {
					if (ref.current.innerHTML == 0) {
						dispatch({
							type: "DELETE_ITEM",
							payload: bookData,
						});
					} else {
						dispatch({
							type: "EDIT_ITEM",
							payload: bookData,
							count: ref.current.innerHTML,
						});
					}
				} else {
					dispatch({
						type: "ADD_ITEM",
						payload: bookData,
						count: ref.current.innerHTML,
					});
				}
			});
		} else {
			if (ref.current.innerHTML > 0) {
				dispatch({
					type: "ADD_ITEM",
					payload: bookData,
					count: ref.current.innerHTML,
				});
			}
		}
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
				/* for (let i = 0; i < data.items.length; i++) {
					if (data.items[i].volumeInfo.subtitle == slug) {
						setBook({
							...book,
							id: data.items[i].id,
							title: data.items[i].volumeInfo.title,
							rating: 5.0,
							price: 112000,
							index: i,
							publisher: "افق",
							category: "رمان",
							image: images[i],
							description: data.items[i].volumeInfo.description,
							author: data.items[i].volumeInfo.authors,
						});
						break;
					}
				} */
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if (state.bookCount.length > 0) {
			for (let i = 0; i < state.bookCount.length; i++) {
				if (book.title == state.bookCount[i].title) {
					let c = state.bookCount[i].count;
					ref.current.innerHTML = c;
					break;
				} else {
					ref.current.innerHTML = 0;
				}
			}
		} else {
			ref.current.innerHTML = 0;
		}
	}, [state, book]);

	return (
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
						{book.author && <p>{book.author && book.author.join(", ")}</p>}
					</h2>
					<h2>
						<span>دسته بندی:</span>
						{book.category && <p>{book.author && book.category.join(", ")}</p>}
					</h2>
					{book.price && (
						<h2 className="price">
							{book.price.toLocaleString()} <span>تومان</span>
						</h2>
					)}
					<div className="add-to-cart">
						<div className="change-count">
							<div onClick={handleIncrease} className="increase">
								<img src={plus} alt="plus" />
							</div>
							<div className="number">
								<span ref={ref}></span>
							</div>
							<div onClick={handleDecrease} className="decrease">
								<img src={minus} alt="minus" />
							</div>
						</div>
						<button onClick={() => handleAddToCart(book)} type="button">
							افزودن به سبد خرید
						</button>
					</div>
				</div>
			</div>
			<span id="describe">معرفی کتاب:</span>
			<p>{book.description}</p>
		</div>
	);
}

export default ProductInfo;
