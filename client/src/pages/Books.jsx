import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Layout from "../components/Layout";
import Pagination from "../components/pagination";
import { useCart } from "../context/cart-context";
import star from "../assets/icons/icon-star.svg";
import addIcon from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";

function Books() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 12,
		total: 0,
		totalPages: 1,
	});
	const [categoriesFilter, setCategoriesFilter] = useState([]);
	const { addToCart } = useCart();

	const fetchBooks = async (page = 1, limit = 12) => {
		setIsLoading(true);
		try {
			const url = new URL(`${import.meta.env.VITE_API_URL}/api/books`);
			url.searchParams.set("page", page.toString());
			url.searchParams.set("limit", limit.toString());
			const categories = searchParams.getAll("category");
			const authors = searchParams.getAll("author");
			categories.forEach((cat) => {
				if (cat !== "همه") {
					url.searchParams.append("category", cat);
				}
			});
			authors.forEach((author) => url.searchParams.append("author", author));

			const res = await fetch(url);
			if (!res.ok) throw new Error("خطا در دریافت لیست کتاب‌ها");
			const data = await res.json();
			setBooks(data.books);
			setCategoriesFilter(data.filters.categories);
			setPagination({
				...pagination,
				page: data.pagination.page,
				total: data.pagination.total,
				totalPages: data.pagination.totalPages,
			});
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		console.log("categoriesFilter >>>", categoriesFilter);
	}, [categoriesFilter]);

	useEffect(() => {
		const page = parseInt(searchParams.get("page")) || 1;
		(async () => {
			await fetchBooks(page);
		})();
	}, [searchParams]);

	const handleAuthorChange = (author) => {
		const authors = searchParams.getAll("author");
		const newAuthors = authors.includes(author)
			? authors.filter((c) => c !== author)
			: [...authors, author];
		setPagination({ ...pagination, page: 1 });
		// Update URL
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete("author");
		newAuthors.forEach((a) => newSearchParams.append("author", a));
		// newSearchParams.delete("category");
		// selectedCategories.forEach((c) => newSearchParams.append("category", c));
		newSearchParams.set("page", "1");
		setSearchParams(newSearchParams);
	};

	const handleCategoryChange = (category) => {
		const categories = searchParams.getAll("category");
		const newCategories = categories.includes(category)
			? categories.filter((c) => c !== category)
			: [...categories, category];

		setPagination({ ...pagination, page: 1 });
		// Update URL
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete("category");
		newCategories.forEach((c) => newSearchParams.append("category", c));
		// newSearchParams.delete("author");
		// selectedAuthors.forEach((a) => newSearchParams.append("author", a));
		newSearchParams.set("page", "1");
		setSearchParams(newSearchParams);
	};

	const handlePageChange = async (newPage) => {
		setPagination({ ...pagination, page: newPage });
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("page", newPage);
		setSearchParams(newSearchParams);
		await fetchBooks(newPage);
	};

	function handleAddtoCart(bookData) {
		addToCart(bookData);
	}

	return (
		<Layout>
			<div className="full-list">
				<div className="books-top-title">کتاب‌های بوک‌لند</div>
				<div className="lists">
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<div className="pagination-wrapper">
							{books.length > 0 ? (
								<>
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
															onClick={() => handleAddtoCart(book)}
															className="add-to-cart"
														>
															<img src={addIcon} alt="plus" />
														</button>
													</div>
												</div>
											</div>
										))}
									</div>
									<Pagination
										page={pagination.page}
										totalPages={pagination.totalPages}
										onPageChange={handlePageChange}
									/>
								</>
							) : (
								<p>کتابی یافت نشد.</p>
							)}
						</div>
					)}
				</div>

				{/* <div>
					{categoriesFilter.length > 0 &&
						categoriesFilter.map((cat) => (
							<label key={cat}>
								{cat}
								<input
									type="checkbox"
									name={"category"}
									value={cat}
									checked={searchParams.getAll("category").includes(cat)}
									onChange={() => handleCategoryChange(cat)}
								/>
							</label>
						))}
				</div> */}
			</div>
		</Layout>
	);
}

export default Books;
