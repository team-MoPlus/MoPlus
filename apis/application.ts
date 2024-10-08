import { ApplicationForm } from "../types/result";
import { api } from "./axios";

export const postApplication = async ({
	testId,
	name,
	phoneNumber,
}: ApplicationForm) => {
	return await api
		.post(`/detailResultApplication`, {
			testResultId: testId,
			name: name,
			phoneNumber: phoneNumber,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};
