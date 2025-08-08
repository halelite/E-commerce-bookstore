import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const ResetPassword = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	// Get the page the user came from
	const from =
		location.state?.from ||
		new URLSearchParams(location.search).get("from") ||
		"/";

	console.log("params .>>", token);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateForm = (data) => {
		let errors = {};
		if (!data.password.trim()) {
			errors.password = "رمز عبور الزامی است.";
		}

		if (data.password !== data.confirmPassword) {
			errors.confirmPassword = "رمزهای عبور مطابقت ندارند.";
		}

		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validateForm(formData);
		setLoading(true);

		if (Object.keys(validationErrors).length === 0) {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							password: formData.password,
						}),
					}
				);
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "خطا در بازنشانی رمز عبور");
				toast.success(data.message);
				setTimeout(() => {
					const from =
						location.state?.from ||
						new URLSearchParams(location.search).get("from") ||
						"/";
					navigate(from, { replace: true }); // Redirect to previous page or home
				}, 2000);
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
		<div className="forgot-password-container">
			<Link className="back-to-home" to="/">
				بازگشت به صفحه اصلی
			</Link>
			<p id="title">بازنشانی رمز عبور</p>
			<form onSubmit={handleSubmit}>
				<div className="field-wrap">
					<label htmlFor="password">رمز عبور جدید</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						className={`${errors.password ? "errorField" : ""}`}
						onChange={handleInputChange}
					/>
					{errors.password && <span className="error">{errors.password}</span>}
				</div>

				<div className="field-wrap">
					<label htmlFor="confirmPassword">تکرار رمز عبور جدید</label>
					<input
						type="password"
						name="confirmPassword"
						onChange={handleInputChange}
						className={`${errors.confirmPassword ? "errorField" : ""}`}
					/>
					{errors.confirmPassword && (
						<span className="error">{errors.confirmPassword}</span>
					)}
				</div>

				<button type="submit" disabled={loading}>
					{loading ? "در حال بازنشانی..." : "بازنشانی رمز عبور"}
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
