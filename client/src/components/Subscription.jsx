import { useState } from "react";
import { toast } from "react-toastify";

function Subscription() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email.trim()) {
			setEmail("");
			toast.success("با موفقیت به لیست خبرنامه اضافه شدید.");
			setError("");
		} else {
			setError("ایمیل الزامی است.");
		}
	};

	return (
		<div className="subscription">
			<div className="sub-description">
				<h3>خبرنامه</h3>
				<p>با وارد کردن ایمیل خود از جدیدترین کتاب‌ها در بوک‌لند مطلع شوید.</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div id="send-email" className={`${error ? "sub-error" : ""}`}>
					<input
						className={`${error ? "sub-error" : ""}`}
						type="email"
						value={email}
						id="email"
						placeholder="ایمیل خود را وارد نمایید..."
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button type="submit">ثبت ایمیل</button>
				</div>
				{error && <span className="error">{error}</span>}
			</form>
		</div>
	);
}

export default Subscription;
