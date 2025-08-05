import bookImg from '../assets/images/hero-img2.png';
import {useNavigate} from "react-router";

function HeroSection() {
    const navigate = useNavigate();

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