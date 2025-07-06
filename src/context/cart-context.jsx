import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./auth-context";

const initialState = {
	cart: [],
};

function reducer(state, action) {
	switch (action.type) {
		/* case "ADD_ITEM":
			const bookExists = state.cart.find(
				(item) => item.bookId === action.payload.bookId
			);

			if (bookExists) {
				return {
					...state,
					cart: state.cart.map((item) => {
						return item.bookId === action.payload.bookId
							? { ...item, quantity: item.quantity + action.payload.quantity }
							: item;
					}),
				};
			}

			return {
				...state,
				cart: [
					...state.cart,
					{
						...action.payload,
					},
				],
			}; */

		case "ADD_ITEM":
			const bookExists = state.cart.find(
				(item) => item.bookId === action.payload.bookId
			);

			if (bookExists) {
				return state;
			}

			return {
				...state,
				cart: [
					...state.cart,
					{
						...action.payload,
					},
				],
			};

		case "EDIT_ITEM":
			return {
				...state,
				cart: state.cart.map((item) =>
					item.bookId === action.payload.bookId
						? { ...item, quantity: action.payload.quantity }
						: item
				),
			};

		case "DELETE_ITEM":
			return {
				...state,
				cart: state.cart.filter(
					(item) => item.bookId !== action.payload.bookId
				),
			};

		case "SET_CART":
			return {
				...state,
				cart: action.payload,
			};
		default:
			return state;
	}
}

export const CartContext = createContext();

export function CartProvider({ children }) {
	const { isAuthenticated } = useAuth();
	const [state, dispatch] = useReducer(reducer, initialState);
	const guestId = localStorage.getItem("guestId");

	useEffect(() => {
		if (!isAuthenticated) {
			const guestCart =
				JSON.parse(localStorage.getItem(`cart_${guestId}`)) || [];
			dispatch({ type: "SET_CART", payload: guestCart });
			console.log("not authenticated?");
		} else {
			const token = localStorage.getItem("token");
			console.log("authenticated?");
			fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((res) => {
					if (!res.ok) throw new Error("Failed to fetch cart");
					return res.json();
				})
				.then((data) => dispatch({ type: "SET_CART", payload: data.cart }))
				.catch((err) => console.log("Error fetching cart: ", err));
		}
	}, [isAuthenticated, guestId]);

	const addToCart = async (book, quantity = 1) => {
		const payload = {
			...book,
			bookId: book._id,
			quantity,
		};
		dispatch({
			type: "ADD_ITEM",
			payload,
		});

		if (isAuthenticated) {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/cart/addToCart`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							bookId: book._id,
							quantity,
						}),
					}
				);
				if (!response.ok) throw new Error("Failed to add to cart");
				const data = await response.json();
				// because we return cart items in the backend (cartController)
				dispatch({ type: "SET_CART", payload: data.cart });
			} catch (err) {
				console.log("Error adding to cart:", err);
				// Optionally revert the optimistic update
				dispatch({ type: "SET_CART", payload: state.cart });
			}
		} else {
			// since useReducer updates are async
			const updatedCart = reducer(state, { type: "ADD_ITEM", payload }).cart;
			localStorage.setItem(`cart_${guestId}`, JSON.stringify(updatedCart));
		}
	};

	const editCartItem = async (bookId, quantity) => {
		dispatch({
			type: "EDIT_ITEM",
			payload: { bookId, quantity },
		});

		if (isAuthenticated) {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/cart/editCartItem`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							bookId: book._id,
							quantity,
						}),
					}
				);
				if (!response.ok) throw new Error("Failed to edit cart item");
				const data = await response.json();
				// because we return cart items in the backend (cartController)
				dispatch({ type: "SET_CART", payload: data.cart });
			} catch (err) {
				const updatedCart = reducer(state, { type: "EDIT_ITEM", payload }).cart;
				localStorage.setItem(`cart_${guestId}`, JSON.stringify(updatedCart));
			}
		}
	};

	const deleteCartItem = async (bookId) => {
		dispatch({
			type: "DELETE_ITEM",
			payload: { bookId },
		});

		if (isAuthenticated) {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/cart/deleteBook`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ bookId }),
					}
				);
				if (!response.ok) throw new Error("Failed to delete cart item");
				const data = await response.json();
				dispatch({ type: "SET_CART", payload: data.cart });
			} catch (err) {
				console.log("Error deleting cart item:", err);
				// Optionally revert the optimistic update
				dispatch({ type: "SET_CART", payload: state.cart });
			}
		} else {
			const updatedCart = reducer(state, {
				type: "DELETE_ITEM",
				payload: { bookId },
			}).cart;
			localStorage.setItem(`cart_${guestId}`, JSON.stringify(updatedCart));
		}
	};

	const syncCart = async (token) => {
		const guestCart = JSON.parse(localStorage.getItem(`cart_${guestId}`)) || [];

		if (guestCart.length > 0 && isAuthenticated) {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/cart/sync`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ cart: guestCart }),
					}
				);
				if (!response.ok) throw new Error("Failed to sync cart");
				localStorage.removeItem(`cart_${guestId}`);
			} catch (err) {
				console.log("Error syncing cart:", err);
			}
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!response.ok) throw new Error("Failed to fetch cart");
			const data = await response.json();
			dispatch({ type: "SET_CART", payload: data.cart });
		} catch (err) {
			console.log("Error fetching cart:", err);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				addToCart,
				editCartItem,
				deleteCartItem,
				syncCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

// useCart hook
export const useCart = () => useContext(CartContext);
