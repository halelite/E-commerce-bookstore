import { useEffect } from "react";

const getPaginationRange = (totalPages, currentPage, delta = 1) => {
	const range = [];
	const dots = "...";

	let left = currentPage - delta;
	let right = currentPage + delta;

	let pages = [];

	for (let i = 1; i <= totalPages; i++) {
		if (i === 1 || i === totalPages || (i >= left && i <= right)) {
			pages.push(i);
		}
	}

	let final = [];
	let prev = 0;

	for (let num of pages) {
		if (prev && num - prev > 1) {
			final.push(dots);
		}
		final.push(num);
		prev = num;
	}

	return final;
};

function Pagination({ page, totalPages, onPageChange }) {
	const paginationRange = getPaginationRange(totalPages, page);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [page]);

	return (
		<div className="pagination">
			<button
				className="pag-control"
				onClick={() => onPageChange(page - 1)}
				disabled={page == 1}
			>
				قبلی
			</button>
			{/* <span>
				{" "}
				Page {page} of {totalPages}{" "}
			</span> */}
			{paginationRange.map((item, id) =>
				item === "..." ? (
					<span key={id}>...</span>
				) : (
					<button
						className={page == item ? "active-pagination" : ""}
						key={item}
						onClick={() => onPageChange(item)}
					>
						{item}
					</button>
				)
			)}
			<button
				className="pag-control"
				onClick={() => onPageChange(page + 1)}
				disabled={page === totalPages}
			>
				بعدی
			</button>
		</div>
	);
}

export default Pagination;
