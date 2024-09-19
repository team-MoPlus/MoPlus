import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest", // ts-jest를 통해 TypeScript 및 JSX 파일 변환
	testEnvironment: "jsdom", // React 컴포넌트를 테스트하므로 jsdom 환경 사용
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest", // ts-jest를 사용하여 TypeScript 및 TSX 파일 변환
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // 지원하는 파일 확장자 목록
	transformIgnorePatterns: [
		"node_modules/(?!.*\\.mjs$)", // ECMAScript Modules을 위한 설정 (필요한 경우)
	],
};

export default config;
