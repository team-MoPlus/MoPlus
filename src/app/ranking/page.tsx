import FilterButtonGroup from "@/components/ButtonGroups/FilterButtonGroup";
import DropdownMenu from "@/components/Dropdowns/DropdownMenu";
import ExamItem from "@/components/Items/ExamItem";
import React from "react";

const page = () => {
	const Subjects = {
		국어: [],
		수학: [],
		영어: [],
		과학: ["물리", "화학", "생명과학", "지구과학", "통합과학"],
		사회: [
			"한국지리/세계지리",
			"동아시아사/세계사",
			"생활과윤리/윤리와사상",
			"사회문화",
			"정치와법",
			"경제",
			"통합사회",
		],
	};

	const Periods = {
		이번주: [],
		"한 달": [],
		"3개월": [],
		"6개월": [],
		"1년": [],
	};

	const examList = [
		{
			thumbnail: "/example_images/thumbnail1.png", // public 디렉토리 내 이미지
			title: "2025ver. 6월 모평 대비 현우진의 킬링캠프 1회",
			year: 2025,
			author: "현우진",
			description:
				"최근 평가원 모의고사와 수능 시험의 출제 기준을 까다로운 흐름과 완벽 해설로 만반 학생들의 문항에 대한 대응 능력을 배양하고, 선택과목 간 유불리를 최소화하기 위해...",
			rating: 7.8,
			difficulty: "어려움",
		},
		{
			thumbnail: "/example_images/thumbnail1.png", // public 디렉토리 내 이미지
			title: "2025ver. 6월 모평 대비 현우진의 킬링캠프 1회",
			year: 2025,
			author: "현우진",
			description:
				"최근 평가원 모의고사와 수능 시험의 출제 기준을 까다로운 흐름과 완벽 해설로 만반 학생들의 문항에 대한 대응 능력을 배양하고, 선택과목 간 유불리를 최소화하기 위해...",
			rating: 6.0,
			difficulty: "어려움",
		},
		{
			thumbnail: "/example_images/thumbnail1.png", // public 디렉토리 내 이미지
			title: "2025ver. 6월 모평 대비 현우진의 킬링캠프 1회",
			year: 2025,
			author: "현우진",
			description:
				"최근 평가원 모의고사와 수능 시험의 출제 기준을 까다로운 흐름과 완벽 해설로 만반 학생들의 문항에 대한 대응 능력을 배양하고, 선택과목 간 유불리를 최소화하기 위해...",
			rating: 7.9,
			difficulty: "어려움",
		},
		{
			thumbnail: "/example_images/thumbnail1.png", // public 디렉토리 내 이미지
			title: "2025ver. 6월 모평 대비 현우진의 킬링캠프 1회",
			year: 2025,
			author: "현우진",
			description:
				"최근 평가원 모의고사와 수능 시험의 출제 기준을 까다로운 흐름과 완벽 해설로 만반 학생들의 문항에 대한 대응 능력을 배양하고, 선택과목 간 유불리를 최소화하기 위해...",
			rating: 1.0,
			difficulty: "어려움",
		},
		{
			thumbnail: "/example_images/thumbnail1.png", // public 디렉토리 내 이미지
			title: "2025ver. 6월 모평 대비 현우진의 킬링캠프 1회",
			year: 2025,
			author: "현우진",
			description:
				"최근 평가원 모의고사와 수능 시험의 출제 기준을 까다로운 흐름과 완벽 해설로 만반 학생들의 문항에 대한 대응 능력을 배양하고, 선택과목 간 유불리를 최소화하기 위해...",
			rating: 9.9,
			difficulty: "어려움",
		},
		{
			thumbnail: "/example_images/thumbnail1.png", // public 디렉토리 내 이미지
			title: "2025ver. 6월 모평 대비 현우진의 킬링캠프 1회",
			year: 2025,
			author: "현우진",
			description:
				"최근 평가원 모의고사와 수능 시험의 출제 기준을 까다로운 흐름과 완벽 해설로 만반 학생들의 문항에 대한 대응 능력을 배양하고, 선택과목 간 유불리를 최소화하기 위해...",
			rating: 7.5,
			difficulty: "어려움",
		},
		{
			thumbnail: "/example_images/thumbnail1.png", // public 디렉토리 내 이미지
			title: "2025ver. 6월 모평 대비 현우진의 킬링캠프 1회",
			year: 2025,
			author: "현우진",
			description:
				"최근 평가원 모의고사와 수능 시험의 출제 기준을 까다로운 흐름과 완벽 해설로 만반 학생들의 문항에 대한 대응 능력을 배양하고, 선택과목 간 유불리를 최소화하기 위해...",
			rating: 7.1,
			difficulty: "어려움",
		},
	];

	return (
		<div className="flex-col w-full h-full px-20 pt-12 overflow-scroll">
			<div className="flex h-20 w-full justify-between items-center">
				<div className="text-3xl font-medium">주간 HOT 모의고사</div>
				<div className="flex items-center border border-black rounded-full px-4 py-2 w-96 focus-within:border-orange-600 focus-within:border-2">
					<input
						type="text"
						placeholder="검색"
						className="flex-grow outline-none px-2"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-5 h-5 text-black cursor-pointer"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
						/>
					</svg>
				</div>
			</div>
			<div className="flex w-full h-20 relative">
				<div className="">
					<DropdownMenu
						defaultText="정렬 기준"
						ItemObj={{
							난이도순: [],
							평점순: [],
							최신순: [],
						}}
						buttonWidth="w-[120px]"
					/>
				</div>
				<div className="">
					<DropdownMenu
						defaultText="개수"
						ItemObj={{ 전체: [], "Top 5": [], "Bottom 5": [] }}
						buttonWidth="w-[128px]"
					/>
				</div>
				<div className="">
					<DropdownMenu defaultText="과목" ItemObj={Subjects} buttonWidth="" />
				</div>
				<div className="absolute right-0">
					<DropdownMenu
						defaultText="기간"
						ItemObj={Periods}
						buttonWidth="w-[100px]"
					/>
				</div>
			</div>
			<div className="w-full max-h-full pr-4">
				{examList.map((exam, index) => (
					<ExamItem
						key={index}
						order={index}
						thumbnail={exam.thumbnail}
						title={exam.title}
						year={exam.year}
						author={exam.author}
						description={exam.description}
						rating={exam.rating}
						difficulty={exam.difficulty}
					/>
				))}
			</div>
		</div>
	);
};

export default page;
