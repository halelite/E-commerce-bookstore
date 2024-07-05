import Footer from "./Footer"
import Main from "./Main"
import Nav from "./Nav"

function Layout({children}) {
    return (
        <>
            <Nav />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    )
}

export default Layout