import React from "react";
import toast from "react-hot-toast";

const HomePage = () => {
	return (
		<div>
			<button
				className="btn btn-secondary"
				onClick={() => toast.success("this clicked")}
			>
				Click
			</button>
		</div>
	);
};

export default HomePage;
