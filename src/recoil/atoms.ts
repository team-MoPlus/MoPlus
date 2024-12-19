import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IRatingTable } from "../../types/result";

const sessionStorage =
	typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
	key: "recoilpersist",
	storage: sessionStorage,
});

// 모의고사
export const testListState = atom({
	key: "testListState",
	default: [],
	effects_UNSTABLE: [persistAtom],
});

// test 정보
export const testInfoState = atom({
	key: "testInfoState",
	default: {
		testId: 0,
		subject: "",
		name: "",
		provider: "",
		round: 0,
		viewCount: 0,
		totalSolvesCount: 0,
	},
	effects_UNSTABLE: [persistAtom],
});

// test 결과 정보
export const testResultState = atom({
	key: "testResultState",
	default: {
		testId: 0,
		solveTime: "",
		score: 0,
		name: "",
		phoneNumber: "",
	},
	effects_UNSTABLE: [persistAtom],
});

// 선택된 선지를 관리하는 atom
export const selectedChoicesState = atom<{ [key: number]: number }>({
	key: "selectedChoicesState",
	default: {},
});

export const incorrectProblemState = atom<
	{ problemNumber: string; incorrectAnswer: string }[]
>({
	key: "incorrectProblemState",
	default: [],
});

export const ratingTablesState = atom<IRatingTable[]>({
	key: "ratingTablesState",
	default: [],
});
