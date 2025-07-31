import { useRef, useState } from "react";
import arrowDown from "../assets/icons/arrow_down_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import arrowUp from "../assets/icons/arrow_up_24dp_FILL0_wght300_GRAD0_opsz24.svg";

export function CustomSelect({ setSelectedCategory }) {
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
	const [show, setShow] = useState(false);
	const [selectedValue, setSelectedValue] = useState(null);

	function handleOptionChange(e) {
		const value = e.target.innerHTML;
		setSelectedValue(value);
		setSelectedCategory(value === "همه" ? null : value);
		setShow(false);
	}

	const optionsList = options.map((option) => {
		return (
			<li onClick={handleOptionChange} className="select-items" key={option}>
				{option}
			</li>
		);
	});

	return (
		<>
			<div className="select" onClick={() => setShow((curr) => !curr)}>
				<div>{!selectedValue ? "دسته بندی" : selectedValue}</div>
				{!show ? <img src={arrowDown} /> : <img src={arrowUp} />}
			</div>
			{show && <ul>{optionsList}</ul>}
			{/* <ul>{show && optionsList}</ul> */}
		</>
	);
}
