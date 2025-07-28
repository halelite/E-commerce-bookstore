import Layout from "../components/Layout";
import { useAuth } from "../context/auth-context";

function Profile() {
	const { user } = useAuth();

	return (
		<Layout>
			<div className="top-title">پروفایل</div>

			<div className="user-info-item">
				<span>نام کاربری:</span>
				<input readOnly disabled type="text" value={user.name} />
			</div>

			<div className="user-info-item">
				<span>ایمیل:</span>
				<input readOnly disabled type="email" value={user.email} />
			</div>
		</Layout>
	);
}

export default Profile;
