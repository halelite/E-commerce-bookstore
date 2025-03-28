import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { GlobalProvider } from "./context/auth-context.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GlobalProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GlobalProvider>
	</StrictMode>
);
