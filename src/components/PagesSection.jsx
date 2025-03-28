import arrowDown from "../assets/icons/arrow_down_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { useEffect, useRef, useState } from "react";
import arrowUp from "../assets/icons/arrow_up_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { Link, NavLink } from "react-router";

function PagesSection({ active }) {
	const ref = useRef();
	const [show, setShow] = useState(false);
	const [options, setOptions] = useState([
		"همه",
		"زبان اصلی",
		"رمان",
		"معمایی-جنایی",
		"عاشقانه",
	]);

	function handleHover() {
		ref.current.style.display = "block";
	}

	function handleUnhover() {
		if (!show) {
			ref.current.style.display = "none";
		}
	}

	useEffect(() => {
		if (show) {
			ref.current.style.display = "block";
		} else {
			ref.current.style.display = "none";
		}
	}, [show]);

	const categoryLinks = options.map((option) => {
		return (
			<li key={option}>
				<Link to={`/categories/${option}`}>{option}</Link>
			</li>
		);
	});

	return (
		<div className={`${active ? "active" : ""} pages`}>
			<ul>
				<li className="wrap-li">
					<NavLink to="/">خانه</NavLink>
				</li>
				<li
					className="wrap-li"
					onMouseLeave={handleUnhover}
					onMouseOver={handleHover}
					onClick={() => setShow((curr) => !curr)}
					id="category"
				>
					دسته بندی
					{!show ? (
						<img src={arrowDown} alt="down" />
					) : (
						<img src={arrowUp} alt="up" />
					)}
					<ul ref={ref} className="cat-list">
						{categoryLinks}
					</ul>
				</li>
				<li className="wrap-li">
					<NavLink to="/authors">نویسنده‌ها</NavLink>
				</li>
				<li className="wrap-li">
					<NavLink to="/about">درباره ما</NavLink>
				</li>
				<li className="wrap-li">
					<NavLink to="/contact">تماس با ما</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default PagesSection;
