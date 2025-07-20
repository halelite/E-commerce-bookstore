import { useContext, useEffect, useState } from "react";
import forward from "../assets/icons/arrow_forward_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import back from "../assets/icons/arrow_back_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import addIcon from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { useCart } from "../context/cart-context";
import go from "../assets/icons/keyboard_backspace_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import star from "../assets/icons/icon-star.svg";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";

function BestsellerLists() {
	const { addToCart } = useCart();
	const [books, setBooks] = useState([]);

	async function handleAddtoCart(bookData) {
		console.log("i am in >>>>", bookData);
		await addToCart(bookData);
	}

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/books`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error(res.status);
				}
			})
			.then((data) => {
				setBooks(data);
				/* for (let i = 0; i < 10; i++) {
					setBooks((books) => [
						...books,
						{
							id: data.items[i].id,
							title: data.items[i].volumeInfo.title,
							rating: 5.0,
							price: 112000,
							// image: data.items[i].volumeInfo.imageLinks.thumbnail
							index: i,
							publisher: "افق",
							category: "رمان",
							image: images[i],
							slug: data.items[i].volumeInfo.subtitle,
							description: data.items[i].volumeInfo.description,
							author: data.items[i].volumeInfo.authors,
						},
					]);
				} */
			})
			.catch((err) => console.log(err));
	}, []);

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
					<button onClick={() => handleAddtoCart(book)} className="add-to-cart">
						<img src={addIcon} alt="plus" />
					</button>
				</div>
			</div>
		);
	});

	return (
		<div className="bestsellers">
			<div className="info-bar">
				<p>پرفروش ترین‌ها</p>
				<p>
					مشاهده همه
					<img src={go} alt="go" />
				</p>
			</div>
			<div className="slide">
				<img
					id="next"
					src={forward}
					className="swiper-button-prev-custom-1"
					alt="next"
				/>
				<Swiper
					className="slider"
					modules={[Navigation, FreeMode, Mousewheel]}
					spaceBetween={10}
					slidesPerView={1}
					touchRatio={1}
					navigation={{
						nextEl: ".swiper-button-next-custom-1",
						prevEl: ".swiper-button-prev-custom-1",
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
					{books.map((book) => (
						<SwiperSlide key={book._id} className="slider-item">
							<Link to={`books/${book.slug}`}>
								<img
									src={`${import.meta.env.VITE_API_URL}${book.image}`}
									alt="book image"
								/>
							</Link>
							<div className="item-info">
								<div className="title-rate">
									<p>{book.title}</p>
									<span id="rating">
										<img src={star} alt="star" /> 5.0
									</span>
								</div>
								<div className="price-info">
									<span id="price">{book.price.toLocaleString()}</span>
									<span className="currency">تومان</span>
								</div>
								<button
									onClick={() => handleAddtoCart(book)}
									className="add-to-cart"
								>
									<img src={addIcon} alt="plus" />
								</button>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<img
					id="previous"
					className="swiper-button-next-custom-1"
					src={back}
					alt="previous"
				/>
			</div>

			{/* <div className="slide">
				<img
					onClick={() => handleClick("forward", "bestsell-slider")}
					id="next"
					src={forward}
					alt="next"
				/>
				<div className="books-container">
					<div className="bestsell-slider slide-container">{bookLists}</div>
				</div>
				<img
					onClick={() => handleClick("back", "bestsell-slider")}
					id="previous"
					src={back}
					alt="previous"
				/>
			</div> */}
		</div>
	);
}

export default BestsellerLists;
