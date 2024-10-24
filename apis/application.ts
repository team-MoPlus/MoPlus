import { AxiosError } from "axios";
import { ApplicationForm } from "../types/result";
import { api } from "./axios";
import toast from "react-hot-toast";

// 최대 재시도 횟수 설정
const MAX_RETRIES = 3;

const notify503 = (retry: number) =>
	toast.loading(`접속자가 많습니다. ${retry}번째 재시도 중입니다..`);
const notifyError = () =>
	toast.error("서버가 과부하 상태입니다. 다시 시도해 주세요.");

export const postApplication = async (
	{ testResultId, name, phoneNumber }: ApplicationForm,
	retryCount = 0
) => {
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
			if (err.response && err.response.status === 503) {
				if (retryCount < MAX_RETRIES) {
					notify503(retryCount);

					return new Promise(
						(resolve) =>
							setTimeout(() => {
								resolve(
									postApplication(
										{ testResultId, name, phoneNumber },
										retryCount + 1
									)
								);
							}, 2000) // 2초 후 다시 시도
					);
				}
			} else {
				notifyError();
			}
		});
};
