import forward from "../assets/icons/arrow_forward_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import back from "../assets/icons/arrow_back_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import {useEffect, useRef, useState} from "react";
import { authorImages } from "../assets/images";
import go from "../assets/icons/keyboard_backspace_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { Link } from "react-router";
import { handleClick } from "../assets/sliderBook";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function AuthorsSection() {
	const swiperRef = useRef(null);
	const [authors, setAuthors] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [slidesPerView, setSlidesPerView] = useState(1);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

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
				setAuthors(data.authors);
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
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading(false);
				if (swiperRef.current) {
					swiperRef.current.update(); // Ensure Swiper recalculates slides
					setIsBeginning(swiperRef.current.isBeginning);
					setIsEnd(swiperRef.current.isEnd);
				}
			});
	}, []);

	// Dynamically set slidesPerView based on window width
	useEffect(() => {
		const updateSlidesPerView = () => {
			const width = window.innerWidth;
			if (width >= 1280) setSlidesPerView(7);
			else if (width >= 1280) setSlidesPerView(6);
			else if (width >= 1212) setSlidesPerView(5);
			else if (width >= 1024) setSlidesPerView(4);
			else if (width >= 768) setSlidesPerView(3);
			else if (width >= 500) setSlidesPerView(2);
			// else if (width >= 320) setSlidesPerView(2);
			else setSlidesPerView(1);
		};

		updateSlidesPerView();
		window.addEventListener("resize", updateSlidesPerView);
		return () => window.removeEventListener("resize", updateSlidesPerView);
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
					className={`swiper-button-prev-custom-3 ${isBeginning ? "disabled" : ""}`}
					alt="next"
				/>
				<SkeletonTheme
					baseColor="#e0e0e0"
					highlightColor="#f5f5f5"
					direction="rtl"
				>
					<Swiper
						className="slider"
						modules={[Navigation, FreeMode, Mousewheel]}
						spaceBetween={10}
						slidesPerView={1}
						mousewheel={{
							releaseOnEdges: true, // Allow page scroll when slider reaches start/end
							forceToAxis: true,
						}}
						touchRatio={1}
						onSwiper={(swiper) => {
							swiperRef.current = swiper; // Store Swiper instance
							setIsBeginning(swiper.isBeginning); // Set initial state
							setIsEnd(swiper.isEnd);
						}}
						onSlideChange={(swiper) => {
							setIsBeginning(swiper.isBeginning); // Update state on slide change
							setIsEnd(swiper.isEnd);
						}}
						navigation={{
							nextEl: ".swiper-button-next-custom-3",
							prevEl: ".swiper-button-prev-custom-3",
						}}
						freeMode={true}
						breakpoints={{
							// 320: {
							// 	slidesPerView: 1,
							// },
							500: {
								slidesPerView: 2,
							},
							768: {
								slidesPerView: 3,
							},
							1024: {
								slidesPerView: 4,
							},
							1212: {
								slidesPerView: 5,
							},
							1280: {
								slidesPerView: 6,
							},
						}}
					>
						{isLoading
							? Array(slidesPerView)
									.fill()
									.map((_, index) => (
										<SwiperSlide
											key={`author-skeleton-${index}`}
											className="slider-item"
										>
											<div id="author-img">
												<Skeleton width={`100%`} height={220} />
											</div>
											<Skeleton width={`80%`} height={20} />
										</SwiperSlide>
									))
							: authors.map((author) => (
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
				</SkeletonTheme>
				<img
					// onClick={() => handleClick("back", "bestsell-slider")}
					id="previous"
					className={`swiper-button-next-custom-3 ${isEnd ? "disabled" : ""}`}
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
