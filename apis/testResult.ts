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

export const sendResultData = async (data: Object) => {
	return await pdfServer
		.post(`/test/resultInfo`, data, {
			headers: { "Content-Type": "application/json" },
		})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error("Error:", error.message);
		});
};

export const requestReviewNote = async () => {
	return await pdfServer
		.post("/request-review")
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error("Error:", error.message);
		});
};

export const getReviewNote = async () => {
	return await pdfServer
		.get(`/download-review`, {
			responseType: "blob", // PDF를 Blob 형식으로 처리
		})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error("Error:", error.message);
		});
};
