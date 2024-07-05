import { Link } from "react-router-dom/cjs/react-router-dom.min"
import arrowDown from "../assets/icons/arrow_down_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import { useEffect, useRef, useState } from "react";
import arrowUp from "../assets/icons/arrow_up_24dp_FILL0_wght300_GRAD0_opsz24.svg";

function PagesSection({active}) {

    const ref = useRef();
    const containerRef = useRef();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);
    const [show, setShow] = useState(false);
    const [options, setOptions] = useState(["همه", "زبان اصلی", "رمان", "معمایی-جنایی", "عاشقانه"]);

    function handleHover() {
        ref.current.style.display = 'block';
    }

    function handleUnhover() {
        if(!show) {
            ref.current.style.display = 'none';
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(window.innerWidth <= 376) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        })

    })

    useEffect(() => {
        if(show) {
            ref.current.style.display = 'block';
        } else {
            ref.current.style.display = 'none';
        }
    }, [show])

    useEffect(() => {
        if(isMobile) {
            if(active) {
                containerRef.current.style.transform = "translateX(0)";
            } else {
                containerRef.current.style.transform = "translateX(150px)";
            }
        } else {
            containerRef.current.style.transform = "translateX(0)";
        }
    }, [active, isMobile])

    const categoryLinks = options.map(option => {
        return (
            <li key={option}>
                <Link to={`/categories/${option}`}>{option}</Link>
            </li>
        )
    })

    return (
        <div ref={containerRef} className="pages">
                <ul>
                    <li className="wrap-li">
                        <Link to='/'>خانه</Link>
                    </li>
                    <li className="wrap-li" onMouseLeave={handleUnhover} onMouseOver={handleHover} onClick={() => setShow(curr => !curr)} id="category">
                        دسته بندی
                        {!show ? <img src={arrowDown} alt="down" /> : <img src={arrowUp} alt="up" />}
                        <ul ref={ref} className="cat-list">
                            {categoryLinks}
                        </ul>
                    </li>
                    <li className="wrap-li">
                        <Link to='/authors'>نویسنده‌ها</Link>
                    </li>
                    <li className="wrap-li">
                        <Link to='/about'>درباره ما</Link>
                    </li>
                    <li className="wrap-li">
                        <Link to='/contact'>تماس با ما</Link>
                    </li>
                </ul>
            </div>
    )
}

export default PagesSection