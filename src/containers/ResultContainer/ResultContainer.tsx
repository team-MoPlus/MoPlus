"use client";

import { Banner } from "@/components/Banner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TestInfo } from "../../../types/Item";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { testInfoState, testResultState } from "@/recoil/atoms";
import { TestResult } from "../../../types/result";

const ResultContainer = ({ testResultId }: { testResultId: number }) => {
	const router = useRouter();
	const testResultInfo = useRecoilValue<TestResult>(testResultState);
	const testInfo = useRecoilValue<TestInfo>(testInfoState);

	// 정규식을 사용하여 H와 M 사이의 숫자 추출
	const matchTest = testResultInfo.solvingTime.match(/PT(\d+)H(\d+)M/);
	const matchAvg = testResultInfo.averageSolvingTime.match(/PT(\d+)H(\d+)M/);

	return (
		<div className="p-4">
			<Link href="/" className="inline-block">
				<Banner />
			</Link>
			<div className="h-16 text-white px-6 my-2 text-xl font-bold bg-orange-600 rounded-lg flex items-center">
				결과
			</div>
			<div className="p-4 w-full border border-dashed border-orange-200 rounded-md">
				<h1 className="text-xl">
					[{testInfo.subject}] {testInfo.name}({testInfo.provider})
				</h1>
				<div className="py-8 flex w-full justify-around items-center">
					<div className="text-5xl text-orange-500">
						{testResultInfo.score}
						<span className="text-gray-500">점</span>
					</div>
					<div className="text-3xl text-gray-400">
						<span className="text-orange-500">{matchTest?.[1] || "0"}</span>h{" "}
						<span className="text-orange-500">{matchTest?.[2] || "0"}</span>m
						<br />
						<div className="text-sm flex justify-end">내 풀이 시간</div>
					</div>
				</div>
			</div>
			<div className="p-4 w-full border border-dashed border-orange-200 rounded-md">
				<h1 className="text-xl mb-4">틀린 문제</h1>
				<div className="flex items-center text-lg gap-5 text-gray-500">
					{testResultInfo.incorrectProblems.map((problem, idx) => (
						<div key={idx} className="flex items-center">
							{problem.problemNumber}번{" "}
							<span className="inline-block ml-1 text-xs text-orange-500 border border-orange-500 rounded-md p-[2px]">
								{problem.point}점
							</span>
						</div>
					))}
				</div>
			</div>
			<div className="w-full border border-dashed border-orange-200 rounded-md p-4">
				<h1 className="text-xl">내 위치</h1>
				<div className="w-full flex justify-between">
					<div className="text-4xl text-orange-500">
						{testResultInfo.rank}
						<span className="text-gray-500">등</span>
					</div>
					<div className="text-2xl text-gray-400">
						<span className="text-orange-500">{matchAvg?.[1] || "0"}</span>h{" "}
						<span className="text-orange-500">{matchAvg?.[2] || "0"}</span>m
						<br />
						<div className="text-sm flex justify-end">평균 풀이 시간</div>
					</div>
				</div>
				<div className="mt-4 mx-4">
					<div className="border border-gray-400 rounded-xl h-16"></div>
					<div className="border border-gray-400 rounded-xl h-16"></div>
					<div className="border border-gray-400 rounded-xl h-16"></div>
				</div>
			</div>

			<div className="flex justify-center">
				<button
					className="w-64 h-12 bg-orange-200 text-orange-500 rounded-lg"
					onClick={() => router.push("/application")}
				>
					상세 분석표 신청하기
				</button>
			</div>
		</div>
	);
};

export default ResultContainer;
