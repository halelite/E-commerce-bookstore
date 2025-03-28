import { Link } from "react-router";

function Login() {
	return (
		<div className="login-container">
			<p id="title">ورود به حساب کاربری</p>
			<form action="">
				<div className="field-wrap">
					<label htmlFor="email">ایمیل</label>
					<input
						type="email"
						id="email"
						placeholder="ایمیل خود را وارد کنید."
					/>
				</div>
				<div className="field-wrap">
					<label htmlFor="password">رمز عبور</label>
					<input
						type="password"
						id="password"
						placeholder="رمز خود را وارد کنید."
					/>
				</div>
				<a className="forgot" href="#">
					رمز عبور را فراموش کرده‌اید؟
				</a>
				<button type="submit">ورود</button>
			</form>
			<div className="to-register">
				<p>حساب کاربری ندارید؟</p>
				<Link to="/register">ثبت نام کنید</Link>
			</div>
		</div>
	);
}

export default Login;
