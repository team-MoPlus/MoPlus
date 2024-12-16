import { api } from "./axios";

/**
 *
 * @returns 모든 모의고사 배열을 리턴합니다.
 */
export const getAllTests = async () => {
	return await api
		.get("/practiceTests/all")
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

/**
 *
 * @param id 모의고사 id
 * @returns id에 해당하는 모의고사를 리턴합니다.
 */
export const getTestById = async (id: number) => {
	return await api
		.get(`practiceTests/${id}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};

/**
 *
 * @param id 모의고사 id
 * @returns id에 해당하는 모의고사의 조회수를 1 increment합니다.
 */
export const countViewCount = async (id: number) => {
	return await api
		.put(`practiceTests/${id}/viewCount`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.error(err));
};
