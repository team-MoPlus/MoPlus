import { api } from "./axios";

export const getAllTests = async () => {
	return await api
		.get("/practiceTests/all")
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};
