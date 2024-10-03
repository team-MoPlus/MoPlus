"use client";

import { Banner } from "@/components/Banner";
import { CheckAnswer } from "@/components/Tables";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TestInfo } from "../../../types/Item";
import { ProblemCount } from "../../../utils/problemCount";

const AnswerContainer = () => {
	const [test, setTest] = useState<TestInfo | null>();

	// 페이지가 로드될 때 sessionStorage에서 선택한 아이템 데이터 가져오기
	useEffect(() => {
		const savedItem = sessionStorage.getItem("selectedItem");
		if (savedItem) {
			setTest(JSON.parse(savedItem)); // JSON 문자열을 객체로 변환하여 상태에 저장
		}
	}, []);

	if (test == null) {
		return <p>error</p>;
	}

	return (
		<div className="p-4">
			<Link href="/" className="inline-block">
				<Banner />
			</Link>
			<div className="h-16 text-white px-6 my-2 text-xl font-bold bg-orange-400 rounded-lg flex items-center">
				오답을 체크하고 답을 입력하세요!
			</div>
			<CheckAnswer
				problemNumber={ProblemCount[test.subject]}
				testId={test.id}
			/>
		</div>
	);
};

export default AnswerContainer;
