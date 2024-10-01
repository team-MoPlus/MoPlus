"use client";

import { Banner } from "@/components/Banner";
import { RequestMo } from "@/components/Buttons";
import { ItemCard } from "@/components/Items";
import SearchBar from "@/components/SearchBar/SearchBar";

import Link from "next/link";
import React, { useState } from "react";

const dummyMO = [
	{
		id: 1,
		subject: "기하",
		title: "2024 고3 9월 모의고사",
		author: "평가원",
		year: 2024,
		visited: 212,
		solved: 50,
	},
	{
		id: 2,
		subject: "화법과작문",
		title: "2024 고3 9월 모의고사",
		author: "평가원",
		year: 2024,
		visited: 1004,
		solved: 520,
	},
	{
		id: 3,
		subject: "언어와매체",
		title: "2024 고3 7월 모의고사",
		author: "교육청",
		year: 2024,
		visited: 901,
		solved: 560,
	},
	{
		id: 4,
		subject: "영어",
		title: "2024 고3 3월 모의고사",
		author: "교육청",
		year: 2024,
		visited: 1201,
		solved: 1004,
	},
	{
		id: 5,
		subject: "세계지리",
		title: "2024 고3 10월 모의고사",
		author: "교육청",
		year: 2024,
		visited: 102,
		solved: 89,
	},
	{
		id: 6,
		subject: "지구과학1",
		title: "2024 고3 9월 모의고사",
		author: "평가원",
		year: 2024,
		visited: 831,
		solved: 713,
	},
	{
		id: 7,
		subject: "화학1",
		title: "2024 고3 6월 모의고사",
		author: "평가원",
		year: 2024,
		visited: 395,
		solved: 391,
	},
	{
		id: 8,
		subject: "생활과윤리",
		title: "2024 고3 7월 모의고사",
		author: "교육청",
		year: 2024,
		visited: 284,
		solved: 193,
	},
];

const page = () => {
	// 검색어 상태 관리
	const [searchTerm, setSearchTerm] = useState<string>("");

	// 검색어로 필터링된 데이터
	const filteredItems = dummyMO.filter(
		(item) =>
			item.title.includes(searchTerm) ||
			item.author.includes(searchTerm) ||
			item.subject.includes(searchTerm) // 검색어와 일치하는 title 필터링
	);

	return (
		<div className="w-full h-full border flex-col p-4">
			<Link href="/">
				<Banner />
			</Link>
			<div className="flex my-2 gap-4">
				<div className="flex-1 text-xl bg-orange-300 rounded-xl text-white p-4">
					내가 풀고 싶은 모의고사를 검색해보세요
				</div>
				<RequestMo />
			</div>

			{/* 검색바에 onSearchTermChange 핸들러 전달 */}
			<SearchBar onSearchTermChange={setSearchTerm} />
			<div className="w-full mt-2">
				{filteredItems.map((item, index) => (
					<Link key={index} href={`/detail/${item.id}`}>
						<ItemCard
							order={index}
							subject={item.subject}
							title={item.title}
							author={item.author}
							year={item.year}
							visited={item.visited}
							solved={item.solved}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default page;
