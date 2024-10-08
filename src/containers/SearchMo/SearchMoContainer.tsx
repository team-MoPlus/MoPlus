"use client";

import { Banner } from "@/components/Banner";
import { RequestMo } from "@/components/Buttons";
import { ItemList } from "@/components/Items";
import SearchBar from "@/components/SearchBar/SearchBar";
import { testListState } from "@/recoil/atoms";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { TestInfo } from "../../../types/Item";
import { getAllTests } from "../../../apis/tests";

const SearchMoContainer = () => {
	// 검색어 상태 관리
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [testList, setTestList] = useRecoilState<TestInfo[]>(testListState); // 가져온 데이터를 저장할 상태
	const [loading, setLoading] = useState<boolean>(true); // 로딩 상태를 관리
	const [error, setError] = useState<string | null>(null); // 에러 상태 관리

	// 검색어로 필터링된 데이터
	const filteredItems = testList.filter(
		(item) =>
			item.name.includes(searchTerm) ||
			item.provider.includes(searchTerm) ||
			item.subject.includes(searchTerm) // 검색어와 일치하는 title 필터링
	);

	useEffect(() => {
		// 페이지 로드 시 데이터를 가져오는 함수
		const fetchTestList = async () => {
			try {
				setLoading(true); // 로딩 상태 활성화
				const data = await getAllTests(); // getTestList 함수 호출
				setTestList(data); // 가져온 데이터를 상태에 저장
				// console.log(data);
			} catch (err) {
				setError("데이터를 가져오는 중 오류가 발생했습니다.");
			} finally {
				setLoading(false); // 로딩 상태 비활성화
			}
		};

		fetchTestList(); // 데이터 가져오기 함수 호출
	}, []);

	// 로딩 중일 때 표시할 UI
	if (loading) {
		return <p>Loading...</p>;
	}

	// 에러가 발생했을 때 표시할 UI
	if (error) {
		return <p>Error: {error}</p>;
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
				<ItemList itemList={filteredItems} />
			</div>
		</div>
	);
};

export default SearchMoContainer;
