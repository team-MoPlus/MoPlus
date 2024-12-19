import { DetailResultApplication, TestResult } from "./../types/result";
import { api, pdfServer } from "./axios";

/**
 *
 * @param id 사용자 id
 * @param wrongProblemsArray 틀린 문제 배열
 * @returns 틀린 문제를 post한 결과를 리턴합니다.
 */
export const postAnswer = async (id: number, wrongProblemsArray: Object[]) => {
	return await api
		.post(`/testResult/${id}/uploadingAnswer`, wrongProblemsArray)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

/**
 *
 * @param testResultId test 결과 Id
 * @param timeString 사용자가 입력한 시/분을 ISO8601 형식으로 변환한 형태
 * @returns 풀이 시간을 post한 결과를 리턴합니다.
 */
export const postSolveTime = async (
	testResultId: number,
	timeString: string
) => {
	// console.log(timeString);
	return await api
		.post(`/testResult/${testResultId}/uploadingMinute`, {
			solvingTime: timeString,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

/**
 *
 * @param id 모의고사 id
 * @returns put 요청이 성공할 경우 제출 수를 1 increment합니다.
 */
export const countSolveCount = async (id: number) => {
	return await api
		.put(`practiceTests/${id}/solveCount`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

/**
 *
 * @param id test 결과 id
 * @returns test 결과 정보를 리턴합니다.
 */
export const getTestResultInfoById = async (id: number) => {
	return await api
		.get(`/testResult/${id}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

/**
 *
 * @param data postApplication의 리턴값
 * @param fileName 파일 이름
 * @returns pdf 생성 요청을 합니다.
 */
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
