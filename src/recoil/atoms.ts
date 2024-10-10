import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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

// 선택과목 -> 과목 변환
export const subjectDictState = atom({
	key: "subjectDictState",
	default: {
		화법과작문: "국어",
		언어와매체: "국어",
		기하: "수학",
		미적분: "수학",
		확률과통계: "수학",
		생활과윤리: "사회",
		윤리와사상: "사회",
		한국지리: "사회",
		세계사: "사회",
		세계지리: "사회",
		동아시아사: "사회",
		정치와법: "사회",
		경제: "사회",
		사회문화: "사회",
		물리I: "과학",
		물리II: "과학",
		화학I: "과학",
		화학II: "과학",
		생명과학I: "과학",
		생명과학II: "과학",
		지구과학I: "과학",
		지구과학II: "과학",
	},
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
	effects_UNSTABLE: [persistAtom], // persistAtom 적용
});

// 오답 체크된 문제를 관리하는 atom
export const checkedProblemsState = atom<number[]>({
	key: "checkedProblemsState",
	default: [],
	effects_UNSTABLE: [persistAtom], // persistAtom 적용
});

// // 선택과목 -> 과목 변환
// export const Subject2Select = atom({
// 	key: "Subject2SelectState",
// 	default: {
// 		국어: ["화법과작문", "언어와매체"],
// 		수학: ["기하", "미적분", "확률과통계"],
// 		사회: [
// 			"생활과윤리",
// 			"윤리와사상",
// 			"한국지리",
// 			"세계사",
// 			"세계지리",
// 			"동아시아사",
// 			"정치와법",
// 			"경제",
// 			"사회문화",
// 		],
// 		과학: [
// 			"물리I",
// 			"물리II",
// 			"화학I",
// 			"화학II",
// 			"생명과학I",
// 			"생명과학II",
// 			"지구과학I",
// 			"지구과학II",
// 		],
// 	},
// });
