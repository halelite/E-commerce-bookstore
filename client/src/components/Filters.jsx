import { useEffect, useRef, useState } from "react";
import close from "../assets/icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";

const Filters = ({
	isFilterActive,
	setIsFilterActive,
	searchParams,
	categoriesFilter,
	authorsFilter,
	handleCategoryChange,
	handleAuthorChange,
}) => {
	const [isCategoryOpen, setIsCategoryOpen] = useState(true);
	const [isAuthorOpen, setIsAuthorOpen] = useState(false);
	const filtersRef = useRef(null);

	useEffect(() => {
		// Lock/unlock body scrolling when filters are active
		if (isFilterActive) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		function handleClickOutside(event) {
			if (filtersRef.current && !filtersRef.current.contains(event.target)) {
				setIsFilterActive(false);
			}
		}
		if (isFilterActive) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isFilterActive]);

	return (
		<>
			<div
				className={`back-shadow ${isFilterActive ? "active-filters" : ""}`}
			/>
			<div
				ref={filtersRef}
				className={`filters ${isFilterActive ? "active-filters" : ""}`}
			>
				<img
					className="close-filters"
					src={close}
					alt="close"
					onClick={() => setIsFilterActive(false)}
				/>
				<h4>فیلترها</h4>
				<div className="accordion">
					<div
						className="accordion-title"
						onClick={() => setIsCategoryOpen(!isCategoryOpen)}
					>
						<div>دسته‌بندی‌</div>
						<div>{isCategoryOpen ? <span className='minus'>-</span> : <span>+</span>}</div>
					</div>
					{isCategoryOpen && (
						<div className="accordion-content">
							{categoriesFilter.length > 0 &&
								categoriesFilter.map((cat) => (
									<div key={cat} className="checkbox-wrapper">
										<input
											type="checkbox"
											name={"category"}
											value={cat}
											checked={searchParams.getAll("category").includes(cat)}
											onChange={() => handleCategoryChange(cat)}
										/>
										<label>{cat}</label>
									</div>
								))}
						</div>
					)}
				</div>

				<div className="accordion">
					<div
						className="accordion-title"
						onClick={() => setIsAuthorOpen(!isAuthorOpen)}
					>
						<div>نویسنده</div>
						<div>{isAuthorOpen ? <span className='minus'>-</span> : <span>+</span>}</div>
					</div>
					{isAuthorOpen && (
						<div className="accordion-content">
							{authorsFilter.length > 0 &&
								authorsFilter.map((author) => (
									<div key={author} className="checkbox-wrapper">
										<input
											type="checkbox"
											name={"author"}
											value={author}
											checked={searchParams.getAll("author").includes(author)}
											onChange={() => handleAuthorChange(author)}
										/>
										<label>{author}</label>
									</div>
								))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Filters;
