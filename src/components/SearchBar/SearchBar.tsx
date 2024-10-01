"use client";

import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";

interface SearchBarProps {
	onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchTermChange }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearchTermChange = (term: string) => {
		setSearchTerm(term);
		onSearchTermChange(term); // 상위 컴포넌트로 검색어 전달
	};

	return (
		<div className="relative w-full">
			<IoMdSearch className="absolute top-3 left-3 text-gray-400" size={24} />

			<input
				type="text"
				className="w-full h-12 p-4 pl-10 pr-4 text-md bg-gray-200 rounded-lg focus:outline-none border focus:border-2 focus:border-orange-500"
				placeholder="선택과목/제목/저자명으로 검색"
				value={searchTerm}
				onChange={(e) => handleSearchTermChange(e.target.value)}
			/>
			<MdCancel
				className={`absolute right-3 top-3 text-gray-400 ${searchTerm.length === 0 ? "hidden" : ""}`}
				size={24}
				onClick={() => handleSearchTermChange("")} // 클릭 시 검색어 초기화
			/>
		</div>
	);
};

export default SearchBar;
