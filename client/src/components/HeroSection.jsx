import bookImg from '../assets/images/hero-img2.png';
import {useNavigate} from "react-router";
import {useEffect} from "react";

function HeroSection() {
    const navigate = useNavigate();

    useEffect(() => {
        // Dynamically set navbar height
        const navbar = document.querySelector(".navbar"); // Adjust selector to match your navbar
        if (navbar) {
            const navbarHeight = navbar.offsetHeight;
            document.documentElement.style.setProperty("--navbar-height", `${navbarHeight}px`);
        }

        // Update on resize or orientation change
        const handleResize = () => {
            const updatedHeight = navbar?.offsetHeight || 120; // Fallback to 120px
            document.documentElement.style.setProperty("--navbar-height", `${updatedHeight}px`);
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, []);

    return (
        <div className="hero-section">
            <div className="promotion">
                <div className="description">
                    <h1>کاراگاه درونتو بیدار کن!</h1>
                <p>سفر به دنیای رمز آلود کتاب پرفروش <b>خدمتکار</b></p>
                <button type='button' onClick={() => navigate(`/books/housemaid`)}>مشاهده و خرید</button>
                </div>
                <img src={bookImg} alt="book image" />
            </div>
        </div>
    )
}

export default HeroSection