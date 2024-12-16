import axios from "axios";

/**
 * REST API 통신을 위한 axios 인스턴스입니다.
 */
export const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
	headers: {
		"Cache-Control": "no-store",
		"Content-type": "application/json",
		"Access-Control-Allow-Credentials": true,
	},
	withCredentials: true,
});

/**
 * pdf 서버 통신을 위한 axios 인스턴스입니다.
 */
export const pdfServer = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_PDF_SERVER_API_URL}`,
	headers: {
		"Cache-Control": "no-store",
		"Content-type": "application/json",
		"Access-Control-Allow-Credentials": true,
	},
	withCredentials: true,
});
