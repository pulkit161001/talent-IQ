import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Clerk Publishable Key");
}

// this is to use tanstack funtionality (which is to fetch data again)
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			{/* after wrapping we can use tanstack functionality in our entire app */}
			<QueryClientProvider client={queryClient}>
				<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
					<App />
				</ClerkProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);
