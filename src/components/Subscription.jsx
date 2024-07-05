function Subscription() {
    return (
        <div className="subscription">
            <div className="sub-description">
                <h3>خبرنامه</h3>
                <p>با وارد کردن ایمیل خود از جدیدترین کتاب‌ها در بوک‌لند مطلع شوید.</p>
            </div>
            <div id="send-email">
                <input type="email" id="email" placeholder="ایمیل خود را وارد نمایید..."/>
                <button type="submit">
                    ثبت ایمیل
                </button>
            </div>
        </div>
    )
}

export default Subscription