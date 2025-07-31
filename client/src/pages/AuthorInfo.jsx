import { useParams } from "react-router";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

function AuthorInfo() {
	const { slug } = useParams();
	const [author, setAuthor] = useState([]);
	const { isLoading, setIsLoading } = useState(false);

	useEffect(() => {
		// setIsLoading(true);
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
				// setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				// setIsLoading(false);
			});
		// .finally(() => {
		// 	setIsLoading(false);
		// });
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
				</div>
			)}
		</Layout>
	);
}

export default AuthorInfo;
