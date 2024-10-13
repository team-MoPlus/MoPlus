"use client";

import { Banner } from "@/components/Banner";
import { RequestMo } from "@/components/Buttons";
import { ItemList } from "@/components/Items";
import SearchBar from "@/components/SearchBar/SearchBar";
import {
	selectedChoicesState,
	testInfoState,
	testListState,
	testResultState,
} from "@/recoil/atoms";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { TestInfo } from "../../../types/Item";
import { getAllTests } from "../../../apis/tests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { usePathname } from "next/navigation";

const SearchMoContainer = () => {
	// 검색어 상태 관리
	const [searchTerm, setSearchTerm] = useState<string>("");


	const { data, isPending, isError, error } = useQuery({
		queryKey: ["tests"],
		queryFn: getAllTests,
	});

	const filterItems = (testList: TestInfo[]) => {
		return testList.filter(
			(item: TestInfo) =>
				item.name.includes(searchTerm) ||
				item.provider.includes(searchTerm) ||
				item.subject.includes(searchTerm) // 검색어와 일치하는 title 필터링
		);
	};

	if (isPending) {
		return <LoadingSpinner />;
	}

	// 에러가 발생했을 때 표시할 UI
	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div className="w-full h-full flex-col p-4">
			<Link href="/" className="inline-block">
				<Banner />
			</Link>
			<div className="flex my-2 gap-4">
				<div className="h-20 flex items-center flex-1 text-xl bg-orange-300 rounded-xl text-white p-4 font-bold">
					내가 풀고 싶은 모의고사를 검색해보세요
				</div>
				<RequestMo />
			</div>

			{/* 검색바에 onSearchTermChange 핸들러 전달 */}
			<SearchBar onSearchTermChange={setSearchTerm} />
			<div className="w-full pt-2 pb-4">
				<ItemList itemList={filterItems(data)} />
			</div>
		</div>
	);
};

export default SearchMoContainer;
