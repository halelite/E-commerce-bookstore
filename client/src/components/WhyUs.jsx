import support from "../assets/icons/headphone-915.svg";
import quality from "../assets/icons/quality-svgrepo-com.svg";
import secure from "../assets/icons/Secure Payment.svg";
import truck from "../assets/icons/delivery-truck-9158.svg";

function WhyUs() {
    return (
        <div className="why-us">
            <div className="wu-item">
                <div className="icon">
                    <img src={truck} alt="free" />
                </div>
                <p>ارسال رایگان</p>
            </div>
            <div className="wu-item">
                <div className="icon">
                    <img src={secure} alt="secure payment" />
                </div>
                <p>پرداخت امن</p>
            </div>
            <div className="wu-item">
                <div className="icon">
                    <img src={quality} alt="quality" />
                </div>
                <p>کنترل کیفیت</p>
            </div>
            <div className="wu-item">
                <div className="icon">
                    <img src={support} alt="support" />
                </div>
                <p>پشتیبانی آنلاین</p>
            </div>
        </div>
    )
}

export default WhyUs