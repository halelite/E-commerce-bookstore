import { useState } from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [urlData, setUrlData] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email.trim()) {
			setEmail("");
			setLoading(true);
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email,
						}),
					}
				);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "خطا در درخواست کد بازنشانی");
				}
				setUrlData(data.resetUrl);
				console.log(data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
			setError("");
		} else {
			setError("ایمیل الزامی است.");
		}
	};

	return (
		<div className="forgot-password-container">
			<Link className="back-to-home" to="/">
				بازگشت به صفحه اصلی
			</Link>
			<p id="title">بازنشانی رمز عبور</p>
			<form onSubmit={handleSubmit}>
				<div>لطفا ایمیل خود را وارد کنید.</div>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={`${error ? "email-error" : ""}`}
					type="email"
					placeholder="example@gmail.com"
				/>
				{error && <span className="error">{error}</span>}
				<button type="submit" disabled={loading}>
					{loading ? "...در حال بارگذاری" : "دریافت لینک بازنشانی رمز عبور"}
				</button>
			</form>

			<div className="reset-url-result">
				{loading ? (
					<div>در حال بارگذاری...</div>
				) : (
					urlData && (
						<div className="reset-url-result">
							<div>برای بازنشانی رمز عبور خود، روی لینک زیر کلیک کنید</div>
							<Link to={urlData}>
								${import.meta.env.VITE_API_URL}${urlData}
							</Link>
							<div>این لینک تا یک ساعت معتبر است.</div>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default ForgotPassword;
