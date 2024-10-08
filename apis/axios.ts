import axios from "axios";

export const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
	headers: {
		"Cache-Control": "no-store",
		"Content-type": "application/json",
		"Access-Control-Allow-Credentials": true,
	},
	withCredentials: true,
});
