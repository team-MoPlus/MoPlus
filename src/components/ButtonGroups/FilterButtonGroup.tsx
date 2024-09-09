"use client";

import React, { useState } from "react";
import FilterButton from "../Buttons/FilterButton";

const FilterButtonGroup = () => {
	const [selectedButton, setSelectedButton] = useState<number>(0); // 선택된 버튼의 인덱스 저장

	const handleButtonClick = (index: number) => {
		setSelectedButton(index); // 클릭된 버튼의 인덱스를 업데이트
	};

	return (
		<div className="flex gap-2">
			<FilterButton
				text="Top 5"
				height="10"
				width="null"
				isSelected={selectedButton === 0}
				onClick={() => handleButtonClick(0)}
			></FilterButton>
			<FilterButton
				text="전체"
				height="10"
				width="null"
				isSelected={selectedButton === 1}
				onClick={() => handleButtonClick(1)}
			></FilterButton>
			<FilterButton
				text="최신순"
				width="null"
				height="10"
				isSelected={selectedButton === 2}
				onClick={() => handleButtonClick(2)}
			></FilterButton>
		</div>
	);
};

export default FilterButtonGroup;
