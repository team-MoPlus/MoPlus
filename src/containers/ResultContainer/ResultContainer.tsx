"use client";

import { Banner } from "@/components/Banner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MoInfo } from "../../../types/Item";
import { useRouter } from "next/navigation";

interface ResultContainerProps {
	moId: number;
}

const ResultContainer = ({ moId }: ResultContainerProps) => {
	const router = useRouter();
	const [item, setItem] = useState<MoInfo | null>(null);

	// 페이지가 로드될 때 sessionStorage에서 선택한 아이템 데이터 가져오기
	useEffect(() => {
		const savedItem = sessionStorage.getItem("selectedItem");
		if (savedItem) {
			setItem(JSON.parse(savedItem)); // JSON 문자열을 객체로 변환하여 상태에 저장
		}
	}, []);

	return (
		<div className="p-4">
			<Link href="/" className="inline-block">
				<Banner />
			</Link>
			{item && (
				<>
					<div className="h-16 text-white px-6 my-2 text-xl font-bold bg-orange-600 rounded-lg flex items-center">
						결과
					</div>
					<div className="p-4 w-full border border-dashed border-orange-300 rounded-md">
						<h1 className="text-xl">
							[{item.subject}] {item.title}({item.author})
						</h1>
						<div className="py-8 flex w-full justify-around items-center">
							<div className="text-5xl">92점</div>
							<div className="text-3xl text-gray-400">
								<span className="text-orange-500">1</span>h{" "}
								<span className="text-orange-500">10</span>m
								<br />
								<div className="text-sm flex justify-end">내 풀이 시간</div>
							</div>
						</div>
					</div>
					<div className="p-4 w-full border border-dashed border-orange-300 rounded-md">
						<h1 className="text-xl mb-4">틀린 문제</h1>
						<div className="flex items-center"></div>
					</div>
					<div className="w-full border border-dashed border-orange-300 rounded-md"></div>

					<div className="flex justify-center">
						<button
							className="w-64 h-12 bg-orange-200 text-orange-500 rounded-lg"
							onClick={() => router.push("/application")}
						>
							상세 분석표 신청하기
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ResultContainer;
