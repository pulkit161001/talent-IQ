import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
	UserButton,
	useUser,
} from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

function App() {
	// useUser hook given by clerk which gives this value
	const { isSingedIn } = useUser();
	const { data, isLoading, error } = useQuery();
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/problems"
					element={
						isSingedIn ? <ProblemsPage /> : <Navigate to={"/"} />
					}
				/>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;

// tw, daisyUI, react-router-dom, react-hot-toast, react-query aka tanstack query, axios
