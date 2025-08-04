import { useParams } from "react-router";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import AuthorBooksSection from "../components/AuthorBooksSection.jsx";

function AuthorInfo() {
	const { slug } = useParams();
	const [author, setAuthor] = useState([]);
	const { isLoading, setIsLoading } = useState(true);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/authors/${slug}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error(res);
				}
			})
			.then((data) => {
				setAuthor(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<Layout>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="author-info">
					<div className="basic-info">
						<img
							src={`${import.meta.env.VITE_API_URL}${author?.image}`}
							alt={`${author.fullName_en} image`}
						/>

						<div>
							<div>{author.fullName}</div>
							{author.fullName_en && <div>{author.fullName_en}</div>}
						</div>
					</div>

					<div className="author-bio">{author.bio}</div>

					<AuthorBooksSection author={author?.fullName} />
				</div>
			)}
		</Layout>
	);
}

export default AuthorInfo;
