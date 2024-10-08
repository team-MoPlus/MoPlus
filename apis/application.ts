import { ApplicationForm } from "../types/result";
import { api } from "./axios";

export const postApplication = async ({
	testResultId,
	name,
	phoneNumber,
}: ApplicationForm) => {
	return await api
		.post(`/detailResultApplication`, {
			testResultId: testResultId,
			name: name,
			phoneNumber: phoneNumber,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};
