import { useContext, useEffect, useState } from "react";
import { images } from "../assets/images";
import forward from "../assets/icons/arrow_forward_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import back from "../assets/icons/arrow_back_ios_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import addIcon from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { GlobalContext } from "../context/auth-context";
import go from "../assets/icons/keyboard_backspace_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import star from "../assets/icons/icon-star.svg";
import { Link } from "react-router";
import { handleClick } from "../assets/sliderBook";

function BestsellerLists() {
	const { dispatch } = useContext(GlobalContext);
	const [books, setBooks] = useState([]);

	function handleAddtoCart(bookData) {
		console.log(bookData);
		dispatch({
			type: "ADD_ITEM",
			payload: bookData,
			count: 1,
		});
	}

	useEffect(() => {
		/*fetch(`https://www.googleapis.com/books/v1/volumes?q=گتسبی&printType=books&langRestrict=fa&maxResults=1&keyAIzaSyB9QR79cHEcQfklBeyQOwgd2OW2ulBFSEs`)
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw Error(res.status);
            }
        })
        .then(data => {
            console.log(data);
            
            setImage(data.items[0].volumeInfo.imageLinks.thumbnail);
        })
        .catch(err => console.log(err)) */

		fetch(`/data/book.json`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error(res.status);
				}
			})
			.then((data) => {
				for (let i = 0; i < 10; i++) {
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
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const bookLists = books.map((book) => {
		return (
			<div key={book.id} className="slider-item">
				<Link to={`books/${book.slug}`}>
					<img src={book.image} alt="book image" />
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
			</div>
		</div>
	);
}

export default BestsellerLists;
