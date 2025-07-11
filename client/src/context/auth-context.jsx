import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const guestId = localStorage.getItem("guestId") || crypto.randomUUID();
		localStorage.setItem("guestId", guestId);
		if (token) {
			fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.user) {
						setUser(data.user);
						setIsAuthenticated(true);
					} else {
						localStorage.removeItem("token");
					}
				})
				.catch((err) => {
					console.log(err);
					localStorage.removeItem("token");
				})
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, []);

	const login = async ({ email, password }) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
					}),
				}
			);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || "خطا در ورود به حساب کاربری");
			}
			const { _id, name, email: userEmail, token } = data;
			localStorage.setItem("token", token);
			setIsAuthenticated(true);
			setUser({ id: _id, name, email: userEmail });
			setLoading(false);
			toast.success("ورود با موفقیت انجام شد");
			return { token, user: { id: _id, name, email: userEmail } };
		} catch (err) {
			toast.error(err.message || "خطا در ورود");
			throw new Error(err.message || "خطا در ورود");
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		setIsAuthenticated(false);
		toast.info("خروج از حساب کاربری با موفقیت انجام شد");
	};

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, login, logout, loading }}
		>
			{/* {!loading && children} */}
			{children}
		</AuthContext.Provider>
	);
};

// useAuth hook
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
