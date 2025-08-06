import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { useCart } from "../context/cart-context";

function Login() {
	const { login } = useAuth();
	const { syncCart } = useCart();
	const navigate = useNavigate();
	const location = useLocation();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	// Get the page the user came from
	const from =
		location.state?.from ||
		new URLSearchParams(location.search).get("from") ||
		"/";

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateForm = (data) => {
		let errors = {};
		if (!data.email.trim()) {
			errors.email = "ایمیل الزامی است.";
		}

		if (!data.password.trim()) {
			errors.password = "رمز عبور الزامی است.";
		}

		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validateForm(formData);
		setLoading(true);

		if (Object.keys(validationErrors).length === 0) {
			try {
				const { token } = await login({
					email: formData.email,
					password: formData.password,
				});
				await syncCart(token);
				navigate(from, { replace: true }); // Redirect to previous page or home
			} catch (err) {
				console.log(err.message);
				setErrors({ general: err.message });
			} finally {
				setLoading(false);
			}
		} else {
			setErrors(validationErrors);
			setLoading(false);
		}
	};

	return (
		<div className="login-container">
			<p id="title">ورود به حساب کاربری</p>
			{errors.general && <span>{errors.general}</span>}
			<form action="" onSubmit={handleSubmit}>
				<div className="field-wrap">
					<label htmlFor="email">ایمیل</label>
					<input
						type="email"
						name="email"
						placeholder="ایمیل خود را وارد کنید."
						value={formData.email}
						className={`${errors.email ? "errorField" : ""}`}
						onChange={handleInputChange}
					/>
					{errors.email && <span className="error">{errors.email}</span>}
				</div>
				<div className="field-wrap">
					<label htmlFor="password">رمز عبور</label>
					<input
						type="password"
						name="password"
						placeholder="رمز خود را وارد کنید."
						onChange={handleInputChange}
						className={`${errors.password ? "errorField" : ""}`}
					/>
					{errors.password && <span className="error">{errors.password}</span>}
				</div>
				<a className="forgot" href="#">
					رمز عبور را فراموش کرده‌اید؟
				</a>
				<button type="submit" disabled={loading}>
					{loading ? "در حال ورود..." : "ورود"}
				</button>
			</form>
			<div className="to-register">
				<p>حساب کاربری ندارید؟</p>
				<Link to="/register" state={{ from }}>
					ثبت نام کنید
				</Link>
			</div>
		</div>
	);
}

export default Login;
