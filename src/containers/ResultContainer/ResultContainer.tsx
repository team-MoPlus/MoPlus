"use client";

import { Banner } from "@/components/Banner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TestInfo } from "../../../types/Item";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { testInfoState, testResultState } from "@/recoil/atoms";
import { TestResult } from "../../../types/result";
import { calculateTimeDifference } from "../../../utils/parseTime";
import toast, { Toaster } from "react-hot-toast";
import { KakaoShareButton } from "@/components/Buttons";

const notify = () => toast.error("브라우저 뒤로가기는 지원하지 않습니다.");

const ResultContainer = ({ testResultId }: { testResultId: number }) => {
	const router = useRouter();
	const pathname = usePathname();
	const testResultInfo = useRecoilValue<TestResult>(testResultState);
	const testInfo = useRecoilValue<TestInfo>(testInfoState);

	// 정규식을 사용하여 H와 M 사이의 숫자 추출
	// const matchTest = testResultInfo.solvingTime.match(/PT(\d+)H(\d+)M/);
	// const matchAvg = testResultInfo.averageSolvingTime.match(/PT(\d+)H(\d+)M/);

	const timeArr = calculateTimeDifference(
		testResultInfo.averageSolvingTime,
		testResultInfo.solvingTime
	);

	useEffect(() => {
		// 히스토리의 마지막 항목을 덮어씁니다.
		window.history.replaceState(null, "", location.href);
		window.onpopstate = function (event) {
			notify();
			history.go(1);
		};
	}, [router]);

	return (
		<div className="p-4">
			{/* 결과 */}
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
						<span className="text-orange-500">
							{testResultInfo.solvingTime.match(/PT(\d+)H(\d+)M/)?.[1] || "0"}
						</span>
						h{" "}
						<span className="text-orange-500">
							{testResultInfo.solvingTime.match(/PT(\d+)H(\d+)M/)?.[2] || "0"}
						</span>
						m
						<br />
						<div className="text-sm flex justify-end">내 풀이 시간</div>
					</div>
				</div>
			</div>
			{/* 틀린 문제 */}
			<div className="p-4 w-full border border-dashed border-orange-200 rounded-md my-2">
				<h1 className="text-xl mb-4">틀린 문제</h1>
				<div className="grid grid-cols-4 items-center text-lg gap-2 text-gray-500">
					{testResultInfo.incorrectProblems.map((problem, idx) => (
						<div key={idx} className="flex items-center text-sm">
							{problem.problemNumber}번{" "}
							<span className="inline-block ml-1 text-xs text-orange-500 border border-orange-500 rounded-md p-[2px]">
								{problem.point}점
							</span>
						</div>
					))}
				</div>
			</div>
			{/* 내 위치 */}
			<div className="w-full border border-dashed border-orange-200 rounded-md p-4">
				<h1 className="text-xl mb-4">내 위치</h1>
				<div className="w-full flex justify-between">
					<div className="text-4xl text-orange-500">
						{testResultInfo.rank}
						<span className="text-gray-500">등</span>
					</div>
					<div className="text-2xl text-gray-400">
						<span className="text-orange-500">
							{testResultInfo.averageSolvingTime.match(/PT(\d+)H(\d+)M/)?.[1] ||
								"0"}
						</span>
						h{" "}
						<span className="text-orange-500">
							{testResultInfo.averageSolvingTime.match(/PT(\d+)H(\d+)M/)?.[2] ||
								"0"}
						</span>
						m
						<br />
						<div className="text-sm flex justify-end">평균 풀이 시간</div>
					</div>
				</div>
				<div className="mt-4 mx-4 text-gray-700">
					<div className="flex justify-start px-8 items-center border border-gray-400 rounded-xl h-16">
						내 위로&nbsp;
						<span className="text-orange-500 text-lg">
							{testResultInfo.rank - 1}명
						</span>
						이 있어요
					</div>
					<div className="w-full flex flex-col items-center gap-1 my-2">
						<div className="rounded-full bg-orange-500 w-1 h-1"></div>
						<div className="rounded-full bg-orange-500 w-1 h-1"></div>
						<div className="rounded-full bg-orange-500 w-1 h-1"></div>
					</div>
					<div className="flex flex-col justify-center px-8 py-4 border border-gray-400 rounded-xl h-fit">
						<p>
							<span className="text-orange-500 text-lg">
								{testResultInfo.rank}등
							</span>
							이예요!
						</p>
						{testResultInfo.solvingCount === 0 ? (
							"첫 번째로 제출했어요! 👍🏼"
						) : (
							<p>
								평균 풀이 시간보다&nbsp;
								<span className="text-orange-500 text-lg">
									{timeArr[1]}시간 {timeArr[2]}분
								</span>
								&nbsp;{timeArr[0] ? "빨리 풀었어요! 😍" : "늦게 풀었어요 😅"}
							</p>
						)}
					</div>
					<div className="w-full flex flex-col items-center gap-1 my-2">
						<div className="rounded-full bg-orange-500 w-1 h-1"></div>
						<div className="rounded-full bg-orange-500 w-1 h-1"></div>
						<div className="rounded-full bg-orange-500 w-1 h-1"></div>
					</div>
					<div className="flex justify-start px-8 items-center border border-gray-400 rounded-xl h-16">
						내 아래로&nbsp;
						<span className="text-orange-500 text-lg">
							{testResultInfo.solvingCount - testResultInfo.rank}명
						</span>
						이 있어요
					</div>
				</div>
			</div>
			{/* 공유하기 */}
			<div className="p-4 w-full border border-dashed border-orange-200 rounded-md my-2">
				<h1 className="text-xl mb-4">공유하기</h1>
				<div className="flex items-center justify-center">
					<KakaoShareButton showLink={`/${testResultInfo.id}/${true}`} />
				</div>
			</div>

			<div className="flex justify-between">
				<button
					className="w-56 h-12 mt-4 bg-orange-200 text-orange-500 rounded-lg text-sm"
					onClick={() => router.replace("/searchmo")}
				>
					홈으로 돌아가기
				</button>
				<button
					className="w-56 h-12 mt-4 bg-orange-500 text-white rounded-lg text-sm"
					onClick={() => {
						router.push("/application");
					}}
				>
					상세 분석 성적표 신청하기
				</button>
			</div>
		</div>
	);
};

export default ResultContainer;
