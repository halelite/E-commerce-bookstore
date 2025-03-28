import { useContext, useEffect, useState } from "react";
import { images } from "../assets/images";
import addIcon from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { GlobalContext } from "../context/auth-context";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router";

function Category() {
	const { slug } = useParams();
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
		fetch(`/data/book.json`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error(res.status);
				}
			})
			.then((data) => {
				for (let i = 10; i > 0; i--) {
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
					<span id="rating">5.0</span>
					<button onClick={() => handleAddtoCart(book)} className="add-to-cart">
						<img src={addIcon} alt="plus" />
					</button>
				</div>
			</div>
		);
	});

	console.log(slug == "همه");

	return (
		<Layout>
			<div className="categories-section">
				<p>کتاب‌های {slug == "همه" ? "همه دسته بندی‌ها" : slug}</p>
				<ul className="all-list">{bookLists}</ul>
			</div>
		</Layout>
	);
}

export default Category;
