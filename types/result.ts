export interface ApplicationForm {
	testResultId: number;
	name: string | null;
	phoneNumber: string | null;
}

interface IncorrectProblem {
	problemNumber: string;
	point: number;
}

export interface TestResult {
	id: number;
	score: number;
	solvingTime: string;
	rank: number;
	averageSolvingTime: string;
	solvingCount: number;
	incorrectProblems: IncorrectProblem[];
}
