"use client";

import { Banner } from "@/components/Banner";
import { RequestMo } from "@/components/Buttons";
import { ItemList } from "@/components/Items";
import SearchBar from "@/components/SearchBar/SearchBar";
import { TfiAnnouncement } from "react-icons/tfi";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { TestInfo } from "../../../types/Item";
import { getAllTests } from "../../../apis/tests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

const SearchMoContainer = () => {
	// 검색어 상태 관리
	const [searchTerm, setSearchTerm] = useState<string>("");

	const router = useRouter();

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
			<div className="flex gap-2">
				<IoChevronBackOutline
					size={36}
					className="cursor-pointer"
					onClick={() => router.push("/")}
				/>
				<Link href="/" className="inline-block">
					<Banner />
				</Link>
			</div>
			<div className="flex my-2 gap-4">
				<div className="h-20 flex justify-center items-center flex-1 bg-orange-500 rounded-xl text-white p-4 font-bold">
					제출할 모의고사를 검색
				</div>
				<RequestMo />
			</div>
			<div className="w-full h-16 rounded-lg border border-red-400 my-2 px-4 flex items-center">
				<TfiAnnouncement className="mr-4 w-6 h-6 text-red-600" />
				2025학년도 수능은 준비 중입니다.
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
