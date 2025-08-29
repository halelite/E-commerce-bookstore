import { useEffect, useRef, useState } from "react";
import forward from "../assets/icons/arrow_forward_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import back from "../assets/icons/arrow_back_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import addIcon from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { useCart } from "../context/cart-context";
import go from "../assets/icons/keyboard_backspace_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import star from "../assets/icons/icon-star.svg";
import { Link, useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function NewBookLists() {
	const navigate = useNavigate();
	const swiperRef = useRef(null);
	const [books, setBooks] = useState([]);
	const { addToCart } = useCart();
	const [slidesPerView, setSlidesPerView] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	function handleAddtoCart(bookData) {
		/* dispatch({
      type: "ADD_ITEM",
      payload: bookData,
      count: 1,
    }); */
		addToCart(bookData);
	}

	// Dynamically set slidesPerView based on window width
	useEffect(() => {
		const updateSlidesPerView = () => {
			const width = window.innerWidth;
			if (width >= 1280) setSlidesPerView(7);
			else if (width >= 1212) setSlidesPerView(6);
			else if (width >= 1024) setSlidesPerView(5);
			else if (width >= 768) setSlidesPerView(4);
			else if (width >= 640) setSlidesPerView(3);
			else if (width >= 340) setSlidesPerView(2);
			else setSlidesPerView(1);
		};

		updateSlidesPerView();
		window.addEventListener("resize", updateSlidesPerView);
		return () => window.removeEventListener("resize", updateSlidesPerView);
	}, []);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/books/new`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error(res.status);
				}
			})
			.then((data) => {
				setBooks(data.books);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading(false);
				if (swiperRef.current) {
					swiperRef.current.update();
					setIsBeginning(swiperRef.current.isBeginning);
					setIsEnd(swiperRef.current.isEnd);
				}
			});
	}, []);

	// Update Swiper states after books are loaded or slidesPerView changes
	useEffect(() => {
		if (!isLoading && swiperRef.current) {
			swiperRef.current.update(); // Recalculate slides
			setIsBeginning(swiperRef.current.isBeginning);
			setIsEnd(swiperRef.current.isEnd || books.length <= slidesPerView);
		}
	}, [isLoading, books, slidesPerView]);

	const bookLists = books.map((book) => {
		return (
			<div key={book._id} className="slider-item">
				<Link to={`books/${book.slug}`}>
					<img
						src={`${import.meta.env.VITE_API_URL}${book.image}`}
						alt="book image"
					/>
				</Link>
				<div className="item-info">
					<p>{book.title}</p>
					<span id="price">{book.price.toLocaleString()}</span>
					<span id="rating">
						<img src={star} alt="star" /> 5.0
					</span>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleAddtoCart(book);
						}}
						className="add-to-cart"
					>
						<img src={addIcon} alt="plus" />
					</button>
				</div>
			</div>
		);
	});

	return (
		<div className="new">
			<div className="info-bar">
				<p>جدید ترین‌ها</p>
				<p onClick={() => navigate("/books/new")}>
					مشاهده همه
					<img src={go} alt="go" />
				</p>
			</div>
			<div className="slide">
				<img
					// onClick={() => handleClick("forward", "bestsell-slider")}
					id="next"
					src={forward}
					className={`swiper-button-prev-custom-2 ${
						isBeginning ? "disabled" : ""
					}`}
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
						navigation={{
							nextEl: ".swiper-button-next-custom-2",
							prevEl: ".swiper-button-prev-custom-2",
						}}
						touchRatio={1}
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
							setIsBeginning(swiper.isBeginning); // Set initial state
							setIsEnd(swiper.isEnd);
						}}
						onSlideChange={(swiper) => {
							setIsBeginning(swiper.isBeginning); // Update state on slide change
							setIsEnd(swiper.isEnd);
						}}
						freeMode={true}
						mousewheel={{
							releaseOnEdges: true, // Allow page scroll when slider reaches start/end
							forceToAxis: true,
						}}
						breakpoints={{
							340: {
								slidesPerView: 2,
							},
							640: {
								slidesPerView: 3,
							},
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 5,
							},
							1212: {
								slidesPerView: 6,
							},
							1280: {
								slidesPerView: 7,
							},
						}}
					>
						{isLoading
							? Array(slidesPerView)
									.fill()
									.map((_, index) => (
										<SwiperSlide
											className="slider-item"
											key={`skeleton-${index}`}
										>
											<div className="book-img book-img-skeleton">
												<Skeleton width={`100%`} height={220} />
											</div>
											<div className="item-info">
												<div className="title-rate">
													<div className="price-info">
														<Skeleton width={90} height={20} />
													</div>
													<Skeleton width={20} height={16} />
												</div>
												<div className="price-add">
													<div className="price-info">
														<Skeleton width={80} height={16} />
													</div>
													<Skeleton width={24} height={24} />
												</div>
											</div>
										</SwiperSlide>
									))
							: books.map((book) => (
									<SwiperSlide
										key={book._id}
										className="slider-item"
										onClick={() => navigate(`books/${book.slug}`)}
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
												<p>{book.title}</p>
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
														handleAddtoCart(book);
													}}
													className="add-to-cart"
												>
													<img src={addIcon} alt="plus" />
												</button>
											</div>
										</div>
									</SwiperSlide>
							  ))}
					</Swiper>
				</SkeletonTheme>
				<img
					// onClick={() => handleClick("back", "bestsell-slider")}
					id="previous"
					className={`swiper-button-next-custom-2 ${isEnd ? "disabled" : ""}`}
					src={back}
					alt="previous"
				/>
			</div>
			{/* <div className="slide">
				<img
					onClick={() => handleClick("forward", "new-slider")}
					id="next"
					src={forward}
					alt="next"
				/>
				<div className="books-container">
					<div className="new-slider slide-container">{bookLists}</div>
				</div>
				<img
					onClick={() => handleClick("back", "new-slider")}
					id="previous"
					src={back}
					alt="previous"
				/>
			</div> */}
		</div>
	);
}

export default NewBookLists;
