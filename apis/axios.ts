import axios from "axios";

export const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
	headers: {
		"Cache-Control": "no-store",
		"Content-type": "application/json",
		"Access-Control-Allow-Credentials": true,
	},
	withCredentials: true,
});

export const pdfServer = axios.create({
	baseURL: `${process.env.PDF_SERVER_API_URL}`,
	headers: {
		"Cache-Control": "no-store",
		"Content-type": "application/json",
		"Access-Control-Allow-Credentials": true,
	},
	withCredentials: true,
});
