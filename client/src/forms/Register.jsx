import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { useCart } from "../context/cart-context";
import { toast } from "react-toastify";

function Register() {
	const { login } = useAuth();
	const location = useLocation();
	const { syncCart } = useCart();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

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
		if (!data.name.trim()) {
			errors.email = "نام کاربری الزامی است.";
		}

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

		console.log("formData", formData);

		if (Object.keys(validationErrors).length === 0) {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/auth/register`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: formData.name,
							email: formData.email,
							password: formData.password,
						}),
					}
				);
				const data = response.json();
				if (!response.ok) {
					throw new Error(data.message || "خطا در ثبت نام");
				}
				const { token } = await login({
					email: formData.email,
					password: formData.password,
				});
				await syncCart(token);
				toast.success("ثبت نام با موفقیت انجام شد");
				navigate(from, { replace: true });
			} catch (err) {
				console.log(err.message);
				setErrors({ general: err.message });
				toast.error("خطا در ثبت نام");
			} finally {
				setLoading(false);
			}
		} else {
			setErrors(validationErrors);
		}
	};

	return (
		<div className="register-container">
			<p id="title">ثبت نام در سایت</p>
			{errors.general && <span>{errors.general}</span>}
			<form action="" onSubmit={handleSubmit}>
				<div className="field-wrap">
					<label htmlFor="name">نام کاربری</label>
					<input
						type="text"
						name="name"
						placeholder="نام کاربری"
						onChange={handleInputChange}
					/>
				</div>
				<div className="field-wrap">
					<label htmlFor="email">ایمیل</label>
					<input
						type="email"
						name="email"
						placeholder="ایمیل خود را وارد کنید."
						onChange={handleInputChange}
					/>
				</div>
				<div className="field-wrap">
					<label htmlFor="password">رمز عبور</label>
					<input
						type="password"
						name="password"
						placeholder="رمز عبور"
						onChange={handleInputChange}
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
				</button>
			</form>
			<div className="to-register">
				<p>حساب کاربری دارید؟</p>
				<Link to="/login">وارد شوید</Link>
			</div>
		</div>
	);
}

export default Register;
