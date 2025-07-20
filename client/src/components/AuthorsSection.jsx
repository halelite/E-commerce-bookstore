import forward from "../assets/icons/arrow_forward_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import back from "../assets/icons/arrow_back_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { useEffect, useState } from "react";
import { authorImages } from "../assets/images";
import go from "../assets/icons/keyboard_backspace_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { Link } from "react-router";
import { handleClick } from "../assets/sliderBook";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";

function AuthorsSection() {
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/authors`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error(res.status);
				}
			})
			.then((data) => {
				setAuthors(data);
				/* for (let i = 0; i < 10; i++) {
					setAuthors((authors) => [
						...authors,
						{
							id: i,
							fullName: data.authors[i].fullName,
							image: authorImages[i],
							slug: data.authors[i].slug,
						},
					]);
				} */
			})
			.catch((err) => console.log(err));
	}, []);

	/* const authorLists = authors.map((author) => {
		return (
			<div key={author._id} className="slider-item">
				<Link to={`authors/${author.slug}`}>
					<img
						id="author-img"
						src={`${import.meta.env.VITE_API_URL}${author.image}`}
						alt="author image"
					/>
				</Link>
				<p>{author.fullName}</p>
			</div>
		);
	}); */

	return (
		<div className="authors">
			<div className="info-bar">
				<p>برخی از نویسنده‌ها</p>
				<p>
					مشاهده همه
					<img src={go} alt="go" />
				</p>
			</div>
			<div className="slide">
				<img
					// onClick={() => handleClick("forward", "bestsell-slider")}
					id="next"
					src={forward}
					className="swiper-button-prev-custom-3"
					alt="next"
				/>
				<Swiper
					modules={[Navigation, FreeMode, Mousewheel]}
					spaceBetween={10}
					slidesPerView={1}
					mousewheel={{
						releaseOnEdges: true, // Allow page scroll when slider reaches start/end
						forceToAxis: true,
					}}
					touchRatio={1}
					navigation={{
						nextEl: ".swiper-button-next-custom-3",
						prevEl: ".swiper-button-prev-custom-3",
					}}
					freeMode={true}
					breakpoints={{
						320: {
							slidesPerView: 1,
							// slidesPerGroup: 2,
						},
						500: {
							slidesPerView: 2,
							// slidesPerGroup: 3,
						},
						768: {
							slidesPerView: 3,
							// slidesPerGroup: 4,
						},
						1024: {
							slidesPerView: 4,
							// slidesPerGroup: 5,
						},
						1212: {
							slidesPerView: 5,
							// slidesPerGroup: 6,
						},
						1280: {
							slidesPerView: 6,
							// slidesPerGroup: 7,
						},
					}}
				>
					{authors.map((author) => (
						<SwiperSlide key={author._id} className="slider-item">
							<Link to={`authors/${author.slug}`}>
								<img
									id="author-img"
									src={`${import.meta.env.VITE_API_URL}${author.image}`}
									alt="author image"
								/>
							</Link>
							<p>{author.fullName}</p>
						</SwiperSlide>
					))}
				</Swiper>
				<img
					// onClick={() => handleClick("back", "bestsell-slider")}
					id="previous"
					className="swiper-button-next-custom-3"
					src={back}
					alt="previous"
				/>
			</div>
			{/* <div className="slide">
				<img
					// onClick={() => handleClick("forward", "author-slider")}
					id="next"
					src={forward}
					alt="next"
				/>
				<div className="books-container">
					<div className="author-slider slide-container">{authorLists}</div>
				</div>
				<img
					onClick={() => handleClick("back", "author-slider")}
					id="previous"
					src={back}
					alt="previous"
				/>
			</div> */}
		</div>
	);
}

export default AuthorsSection;
