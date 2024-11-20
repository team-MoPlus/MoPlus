import { AxiosError } from "axios";
import { ApplicationForm } from "../types/result";
import { api, pdfServer } from "./axios";
import toast from "react-hot-toast";

// 최대 재시도 횟수 설정
const MAX_RETRIES = 3;

const notify503 = (retry: number) =>
	toast.loading(`접속자가 많습니다. ${retry}번째 재시도 중입니다..`);
const notifyError = () =>
	toast.error("서버가 과부하 상태입니다. 다시 시도해 주세요.");

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
		.catch((err: AxiosError) => {
			console.error(err);
		});
};

export const sendDetailResultApplication = async (data: Object) => {
	return await pdfServer
		.post(`/detailResultApplication`, data, {
			headers: { "Content-Type": "application/json" },
		})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error("Error:", error.message);
		});
};
