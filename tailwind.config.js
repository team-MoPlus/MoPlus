/** @type {import('tailwindcss').Config} */
module.exports = {
	extend: {
		fontFamily: {
			sans: ["Pretendard", "Arial", "sans-serif"], // Pretendard를 기본 sans-serif 폰트로 설정
		},
		colors: {
			orange: {
				500: "#FC6C02", // 기본 orange 색상 설정
				600: "#e35d01", // 어두운 변형 추가
			},
		},
	},
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			mobile: "360px",
			// => @media (min-width: 375px) { ... }
			tablet: "600px",
			// => @media (min-width: 600px) { ... }
		},
	},
	plugins: [],
};
