import Searchbar from "./Searchbar";
import logo from "../assets/images/logo.png";
import cart from "../assets/icons/shopping_cart_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect, useRef, useState } from "react";
import { GobalContext } from "../context/auth-context";
import menu from "../assets/icons/menu_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import close from "../assets/icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import PagesSection from "./PagesSection";

function Nav() {

    const ref = useRef();
    const [menuActive, setMenuActive] = useState(false);
    const {state} = useContext(GobalContext);

    useEffect(() => {
        ref.current.innerHTML = state.boughtBooks.length;
        if(ref.current.innerHTML == 0) {
            ref.current.style.display = 'none';
        } else {
            ref.current.style.display = 'block';
        }
    }, [state.boughtBooks.length])    

    return (
        <>
        <div className="navbar">
            <div className="menu-icon" onClick={() => setMenuActive(curr => !curr)}>
                {!menuActive ? <img id="menu" src={menu} alt="menu" /> : <img id="close-menu" src={close} alt="close" />}
            </div>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            <Searchbar />

            <div className="account">
                <div className="sign-in-up">
                    <Link to='/login'>
                        ورود | ثبت‌نام
                    </Link>
                </div>
                <div className="cart">
                    <span className="num" ref={ref}></span>
                    <Link to='/cart'>
                        <img src={cart} alt="cart" />
                    </Link>
                </div>
            </div>
        </div>
        <PagesSection active={menuActive} />
        </>
    )
}

export default Nav