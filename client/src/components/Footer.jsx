import logo from '../assets/images/logo3.png';
import facebookIcon from '../assets/icons/icon-facebook.svg';
import twitterIcon from '../assets/icons/icon-twitter.svg';
import pinterestIcon from '../assets/icons/icon-pinterest.svg';
import instagramIcon from '../assets/icons/icon-instagram.svg';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="company-info">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <p className="info">
                        فروشگاه کتاب بوک‌لند یکی از بهترین کتاب فروشی‌های آنلاین ایران برای خرید کتاب است. شما در هر زمان و در هر جایی که هستید خیلی راحت میتوانید کتاب مورد نظر خود را تهیه کنید.
                    </p>
                </div>
                <div className="footer-links">
                    <div className="footer-item">
                        <h5>بوک‌لند</h5>
                        <a href="/about">درباره ما</a>
                        <a href="/contact">تماس با ما</a>
                        <a href="#">پشتیبانی</a>
                    </div>

                    <div className="footer-item">
                        <h5>خدمات</h5>
                        <a href="#">پرسش‌های متداول</a>
                        <a href="#">حریم خصوصی</a>
                        <a href="#">پیگیری سفارش</a>
                    </div>
                </div>
                <div className="follow">
                    <p>بوک‌لند را در شبکه‌های اجتماعی دنبال کنید.</p>
                    <div className="social-icons">
                        <a href="#">
                            <img src={facebookIcon} alt="facebook" />
                        </a>
                        <a href="#">
                            <img src={twitterIcon} alt="twitter" />
                        </a>
                        <a href="#">
                            <img src={pinterestIcon} alt="pinterest" />
                        </a>
                        <a href="#">
                            <img src={instagramIcon} alt="instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer