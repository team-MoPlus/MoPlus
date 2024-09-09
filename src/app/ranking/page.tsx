import FilterButtonGroup from "@/components/ButtonGroups/FilterButtonGroup";
import DropdownMenu from "@/components/Dropdowns/DropdownMenu";
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

	return (
		<div className="flex-col w-full px-20 pt-12">
			<div className="flex h-20 w-full justify-between items-center">
				<div className="text-3xl font-medium">주간 HOT 모의고사</div>
				<input
					type="text"
					className="border border-black rounded-lg py-2 px-4 w-96 h-10 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
					placeholder="검색"
				/>
			</div>
			<div className="flex w-full h-20">
				<FilterButtonGroup />
				<div className="grid grid-cols-2 w-full ml-2">
					<div className="col-start-1">
						<DropdownMenu defaultText="과목" ItemObj={Subjects} />
					</div>
					<div className="col-start-3">
						<DropdownMenu defaultText="기간" ItemObj={Periods} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
