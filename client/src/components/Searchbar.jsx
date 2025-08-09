import { useCallback, useRef, useState } from "react";
import searchIcon from "../assets/icons/search_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import { CustomSelect } from "./Dropdown";
import { debounce } from "../assets/debounce";
import { useNavigate } from "react-router";

function Searchbar() {
	const navigate = useNavigate();
	const [result, setResult] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const inputEl = useRef(null);

	const fetchSearchResult = async (inputVal, category) => {
		if (!inputVal) {
			setResult([]);
			return;
		}

		setIsLoading(true);
		try {
			console.log("inputval: ", inputVal);
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/api/books/search?query=${inputVal}${
					category ? `&category=${encodeURIComponent(category)}` : ""
				}`
			);

			if (!res.ok) throw new Error("Search failed");
			const data = await res.json();
			setResult(data);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const debounceSearch = useCallback(
		debounce(
			(searchTerm) => fetchSearchResult(searchTerm, selectedCategory),
			1000
		),
		[selectedCategory]
	);

	return (
		<div className="searchbar">
			<div className="custom-select">
				<CustomSelect setSelectedCategory={setSelectedCategory} />
			</div>
			<div className="search-wrapper">
				<input
					ref={inputEl}
					type="text"
					placeholder="جستجو..."
					onChange={() => debounceSearch(inputEl.current?.value)}
				/>
				<div className="result-wrapper" tabIndex="0">
					{!isLoading ? (
						result.length > 0 ? (
							<ul>
								{result.map((book) => (
									<li
										key={book._id}
										onMouseDown={() => {
											navigate(`/books/${book.slug}`);
										}}
									>
										<div>
											<div>{book.title}</div>
											<div>{book.author}</div>
										</div>
										<img
											src={`${import.meta.env.VITE_API_URL}${book.image}`}
											alt="book image"
										/>
									</li>
								))}
							</ul>
						) : (
							<p>
								{inputEl.current?.value
									? "موردی یافت نشد!"
									: "برای جستجو عنوان کتاب یا نام نویسنده را وارد کنید."}
							</p>
						)
					) : (
						<div>در حال بارگذاری...</div>
					)}
				</div>
				<div className="search-icon">
					<img src={searchIcon} alt="search" />
				</div>
			</div>
		</div>
	);
}

export default Searchbar;
