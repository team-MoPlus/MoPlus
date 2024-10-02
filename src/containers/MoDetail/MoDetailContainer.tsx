"use client";

import React, { useEffect, useState } from "react";
import { MoInfo } from "../../../types/Item";
import { getSubjectDict } from "../../../utils/getSubjectDict";
import Link from "next/link";
import { Banner } from "@/components/Banner";

interface MoDetailContainerProps {
	moId: number; // moId를 number 타입으로 지정
}

const MoDetailContainer = ({ moId }: MoDetailContainerProps) => {
	const [item, setItem] = useState<MoInfo | null>(null);
	const subjectDict = getSubjectDict();

	// 페이지가 로드될 때 sessionStorage에서 선택한 아이템 데이터 가져오기
	useEffect(() => {
		const savedItem = sessionStorage.getItem("selectedItem");
		if (savedItem) {
			setItem(JSON.parse(savedItem)); // JSON 문자열을 객체로 변환하여 상태에 저장
		}
	}, []);

	return (
		<div className="w-full h-full border items-center flex-col p-4">
			<Link href="/">
				<Banner />
			</Link>
			{item && (
				<>
					<div className="h-16 text-white px-6 text-xl font-bold bg-orange-300 rounded-lg flex items-center my-2">
						선택하신 모의고사가 맞나요?
					</div>
					<div className="mt-8">
						<p className="text-xl text-orange-500">선택한 모의고사</p>
						<p className="pl-2 text-xl">{item.title}</p>
					</div>

					{Object.keys(subjectDict).includes(item.subject) ? (
						<>
							<div>
								<p className="text-xl text-orange-500 mt-8">과목</p>
								<p className="pl-2 text-xl">{subjectDict[item.subject]}</p>
							</div>
							<div>
								<p className="text-xl text-orange-500 mt-8">선택 과목</p>
								<div className="grid grid-cols-3 gap-x-10 gap-y-4 mt-2 px-4">
									{Object.entries(subjectDict)
										.filter(
											([key, value]) => value === subjectDict[item.subject]
										)
										.map(([key, value], idx) => (
											<div
												key={key}
												className={`flex justify-center items-center h-12 border rounded-xl text-md ${key === item.subject ? "text-orange-500 border-orange-500" : "text-gray-300 border-gray-200"}`}
											>
												{key}
											</div>
										))}
								</div>
							</div>
						</>
					) : (
						<>
							<div>
								<p className="text-xl text-orange-500 mt-8">과목</p>
								<p className="pl-2 text-xl">{item.subject}</p>
							</div>
						</>
					)}
					<Link href={`/answer/${item.id}`}>
						<button className="w-64 h-12 left-1/2 transform -translate-x-1/2 fixed bottom-24 bg-orange-200 text-orange-500 rounded-lg">
							선택 완료
						</button>
					</Link>
				</>
			)}
		</div>
	);
};

export default MoDetailContainer;
