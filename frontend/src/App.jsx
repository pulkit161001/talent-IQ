import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import DashboardPage from "./pages/DashboardPage";

function App() {
	// useUser hook given by clerk which gives this value
	const { isSignedIn, isLoaded } = useUser();

	// this will get rid of the flickering effect
	if (!isLoaded) return null;
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						!isSignedIn ? (
							<HomePage />
						) : (
							<Navigate to={"/dashboard"} />
						)
					}
				/>
				<Route
					path="/dashboard"
					element={
						isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />
					}
				/>
				<Route
					path="/problems"
					element={
						isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />
					}
				/>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;

// tw, daisyUI, react-router-dom, react-hot-toast, react-query aka tanstack query, axios
