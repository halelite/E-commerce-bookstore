import Footer from "./Footer";
import Main from "./Main";
import Nav from "./Nav";

function Layout({ children }) {
	return (
		<div className="layout-style">
			<Nav />
			<Main>{children}</Main>
			<Footer />
		</div>
	);
}

export default Layout;
