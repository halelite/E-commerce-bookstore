import { Link } from "react-router";

function Register() {
	return (
		<div className="register-container">
			<p id="title">ثبت نام در سایت</p>
			<form action="">
				<div className="field-wrap">
					<label htmlFor="name">نام کاربری</label>
					<input type="email" id="name" placeholder="نام کاربری" />
				</div>
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
					<input type="password" id="password" placeholder="رمز عبور" />
				</div>
				<button type="submit">ثبت نام</button>
			</form>
			<div className="to-register">
				<p>حساب کاربری دارید؟</p>
				<Link to="/login">وارد شوید</Link>
			</div>
		</div>
	);
}

export default Register;
