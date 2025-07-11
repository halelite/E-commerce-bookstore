import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { CartProvider } from "./context/cart-context.jsx";
import { AuthProvider } from "./context/auth-context.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<CartProvider>
					<SkeletonTheme direction="rtl">
						<App />
					</SkeletonTheme>
				</CartProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
