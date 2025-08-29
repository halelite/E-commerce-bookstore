import { useEffect, useState } from "react";
import { useCart } from "../context/cart-context.jsx";
import go from "../assets/icons/keyboard_backspace_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { SkeletonTheme } from "react-loading-skeleton";
import star from "../assets/icons/icon-star.svg";
import addIcon from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { useNavigate } from "react-router";

const AuthorBooksSection = ({ author }) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function handleAddToCart(bookData) {
		await addToCart(bookData);
	}

	useEffect(() => {
		if (author) {
			fetch(
				`${import.meta.env.VITE_API_URL}/api/books?author=${encodeURIComponent(
					author
				)}`
			)
				.then((res) => {
					if (res.ok) {
						return res.json();
					} else {
						throw Error(res.status);
					}
				})
				.then((data) => {
					setBooks(data.books);
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [author]);

	return (
		<div className="author-books">
			<div className="info-bar">
				<p>برخی از کتاب‌های این نویسنده</p>
				<p
					onClick={() =>
						navigate(`/books?author=${encodeURIComponent(author)}`)
					}
				>
					مشاهده همه
					<img src={go} alt="go" />
				</p>
			</div>
			<SkeletonTheme
				baseColor="#e0e0e0"
				highlightColor="#f5f5f5"
				direction="rtl"
			>
				{isLoading ? (
					<div>در حال بارگذاری...</div>
				) : (
					<>
						{books.length > 0 ? (
							<div className="all-book-grid">
								{books.map((book) => (
									<div
										key={book._id}
										className="slider-item"
										onClick={() => navigate(`/books/${book.slug}`)}
									>
										<div className="img-wrapper">
											<img
												className="book-img"
												src={`${import.meta.env.VITE_API_URL}${book.image}`}
												alt="book image"
											/>
										</div>
										<div className="item-info">
											<div className="title-rate">
												<p>
													{book.category.includes("زبان اصلی")
														? book.en_title
														: book.title}
												</p>
												<span id="rating">
													<img src={star} alt="star" /> 5.0
												</span>
											</div>
											<div className="price-add">
												<div className="price-info">
													<span id="price">
														{book.price.toLocaleString()}
														<span className="currency">تومان</span>
													</span>
												</div>
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleAddToCart(book);
													}}
													className="add-to-cart"
												>
													<img src={addIcon} alt="plus" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<p>کتابی یافت نشد.</p>
						)}
					</>
				)}
			</SkeletonTheme>
		</div>
	);
};

export default AuthorBooksSection;
