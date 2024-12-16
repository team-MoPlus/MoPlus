import { DetailResultApplication, TestResult } from "./../types/result";
import { api, pdfServer } from "./axios";

export const postAnswer = async (id: number, wrongProblemsArray: Object[]) => {
	return await api
		.post(`/testResult/${id}/uploadingAnswer`, wrongProblemsArray)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

export const postSolveTime = async (
	testResultId: number,
	timeString: string
) => {
	return await api
		.post(`/testResult/${testResultId}/uploadingMinute`, {
			solvingTime: timeString,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

export const countSolveCount = async (id: number) => {
	return await api
		.put(`practiceTests/${id}/solveCount`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

export const getTestResultInfoById = async (id: number) => {
	return await api
		.get(`/testResult/${id}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

export const getReviewNote = async (
	data: DetailResultApplication,
	fileName: string
) => {
	return await pdfServer
		.post(
			`/download-review`,
			{ test_result: data, file_name: fileName },
			{
				responseType: "blob", // PDF를 Blob 형식으로 처리
				headers: {
					"Content-Type": "application/json", // JSON 형식 명시
				},
			}
		)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error("Error:", error.message);
		});
};
