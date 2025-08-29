import Filters from "./Filters.jsx";
import star from "../assets/icons/icon-star.svg";
import addIcon from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { useNavigate } from "react-router";
import { useCart } from "../context/cart-context.jsx";

const FilteredBooksLists = ({
	books,
	isFilterActive,
	setIsFilterActive,
	searchParams,
	categoriesFilter,
	authorsFilter,
	handleCategoryChange,
	handleAuthorChange,
}) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();

	function handleAddToCart(bookData) {
		addToCart(bookData);
	}

	return (
		<div className="filter-books-wrapper">
			<Filters
				isFilterActive={isFilterActive}
				setIsFilterActive={setIsFilterActive}
				searchParams={searchParams}
				categoriesFilter={categoriesFilter}
				authorsFilter={authorsFilter}
				handleCategoryChange={handleCategoryChange}
				handleAuthorChange={handleAuthorChange}
			/>
			<div className="all-book-grid">
				{books.length > 0 ? (
					books.map((book) => (
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
					))
				) : (
					<p>کتابی یافت نشد.</p>
				)}
			</div>
		</div>
	);
};

export default FilteredBooksLists;
