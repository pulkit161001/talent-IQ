import axios from "axios";
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	// by adding this field browser will send the cookies to the server autimatically on every single request
	// clerk can check if user is authenticate on the server side
	withCredentials: true,
});

export default axiosInstance;
