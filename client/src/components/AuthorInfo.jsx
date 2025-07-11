import { useParams } from "react-router";
import Layout from "./Layout";

function AuthorInfo() {
	const { slug } = useParams();

	return (
		<Layout>
			<div>author info {slug}</div>
		</Layout>
	);
}

export default AuthorInfo;
