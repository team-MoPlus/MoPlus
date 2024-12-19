// problemCount.ts 파일로 분리하여 사용하기
import { Subject } from "./subjectEnum";

export const ProblemCount: { [key: string]: number } = {
	[Subject.화법과작문]: 45,
	[Subject.언어와매체]: 45,
	[Subject.미적분]: 30,
	[Subject.확률과통계]: 30,
	[Subject.기하]: 30,
	[Subject.고1]: 30,
	[Subject.고2]: 30,
	[Subject.영어]: 45,
	[Subject.물리I]: 20,
	[Subject.화학I]: 20,
	[Subject.생명과학I]: 20,
	[Subject.지구과학I]: 20,
	[Subject.물리II]: 20,
	[Subject.화학II]: 20,
	[Subject.생명과학II]: 20,
	[Subject.지구과학II]: 20,
	[Subject.한국지리]: 20,
	[Subject.세계지리]: 20,
	[Subject.동아시아사]: 20,
	[Subject.생활과윤리]: 20,
	[Subject.윤리와사상]: 20,
	[Subject.사회문화]: 20,
	[Subject.정치와법]: 20,
	[Subject.경제]: 20,
};
