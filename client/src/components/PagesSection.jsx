import arrowDown from "../assets/icons/arrow_down_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import {useRef, useState, useLayoutEffect, useEffect} from "react";
import arrowUp from "../assets/icons/arrow_up_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { Link, NavLink } from "react-router";

function PagesSection({ active, closeMenu, menuToggleButton }) {
	const ref = useRef();
	const menuRef = useRef(null)
	const [show, setShow] = useState(false);
	const [options, setOptions] = useState([
		"همه",
		"زبان اصلی",
		"ادبیات کلاسیک",
		"معمایی",
		"عاشقانه",
		"سیاسی",
		"ماجراجویی",
		"فانتزی",
		"نمایشنامه",
		"فلسفی",
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
		// Lock/unlock body scrolling when menu is active
		if (active) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		function handleClickOutside(event) {
			if (menuRef.current && !menuToggleButton.current.contains(event.target) && !menuRef.current.contains(event.target)) {
				closeMenu();        // close full menu
				setShow(false);     // close dropdown
			}
		}
		if (active) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [active, closeMenu]);

	useLayoutEffect(() => {
		if (show) {
			ref.current.style.display = "block";
		} else {
			ref.current.style.display = "none";
		}
	}, [show]);

	const categoryLinks = options.map((option) => {
		return (
			<li key={option}>
				<Link
					to={`/books${
						option !== "همه" ? `?category=${encodeURIComponent(option)}` : ""
					}`}
					onClick={() => {
						closeMenu();
						setShow(false);
					}}
				>
					{option}
				</Link>
			</li>
		);
	});

	return (
		<>
			<div
				className={`back-shadow ${active ? "active-menu" : ""}`}
			/>
			<div ref={menuRef} className={`${active ? "active" : ""} pages`}>
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
						<div className="category-menu-item">
							دسته بندی
							{!show ? (
								<img src={arrowDown} alt="down"/>
							) : (
								<img src={arrowUp} alt="up"/>
							)}
						</div>
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
		</>
	);
}

export default PagesSection;
