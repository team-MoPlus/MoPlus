import { api } from "./axios";

export const getAllTests = async () => {
	return await api
		.get("/practiceTests/all")
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

export const getTestById = async (id: number) => {
	return await api
		.get(`practiceTests/${id}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

export const countViewCount = async (id: number) => {
	return await api
		.put(`practiceTests/${id}/viewCount`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};
