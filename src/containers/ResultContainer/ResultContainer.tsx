"use client";

import { Banner } from "@/components/Banner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TestInfo } from "../../../types/Item";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	ratingTablesState,
	testInfoState,
	testResultState,
} from "@/recoil/atoms";
import { TestResult } from "../../../types/result";
import { calculateTimeDifference } from "../../../utils/parseTime";
import toast, { Toaster } from "react-hot-toast";
import { KakaoShareButton } from "@/components/Buttons";
import { requestReviewNote } from "../../../apis/testResult";
import { DropdownMenu } from "@/components/Dropdowns";

const notify = () => toast.error("브라우저 뒤로가기는 지원하지 않습니다.");

const ResultContainer = ({ testResultId }: { testResultId: number }) => {
	const router = useRouter();
	const testResultInfo = useRecoilValue<TestResult>(testResultState);
	const testInfo = useRecoilValue<TestInfo>(testInfoState);
	const [timeArr, setTimeArr] = useState<string[]>([]);
	const [rankProvider, setRankProvider] = useState("대성마이맥");
	const [ratingTables, setRatingTables] = useRecoilState(ratingTablesState);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			// 현재 스크롤 위치
			const scrollTop = window.scrollY;

			// 화면 높이와 문서 전체 높이
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			// 스크롤이 페이지 하단에 도달했는지 확인
			if (scrollTop + windowHeight >= documentHeight - 60) {
				setIsVisible(false); // 버튼 숨기기
			} else {
				setIsVisible(true); // 버튼 보이기
			}
		};

		// 스크롤 이벤트 등록
		window.addEventListener("scroll", handleScroll);

		// 이벤트 정리
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		setTimeArr([
			testResultInfo.solvingTime.match(/PT(?:(\d+)H)?(?:(\d+)M)?/)?.[1] || "0",
			testResultInfo.solvingTime.match(/PT(?:(\d+)H)?(?:(\d+)M)?/)?.[2] || "0",
		]);
		setRatingTables({
			대성마이맥: testResultInfo.ratingTables.find(
				(obj) => obj.ratingProvider === "대성마이맥"
			)!.ratingRows,
			이투스: testResultInfo.ratingTables.find(
				(obj) => obj.ratingProvider === "이투스"
			)!.ratingRows,
		});
	}, []);

	// useEffect(() => {
	// 	sendResultData(JSON.stringify(testResultInfo));
	// }, []);

	return (
		<div className="p-4">
			{/* 결과 */}
			<div className="h-16 text-white px-6 my-2 text-xl font-bold bg-orange-500 rounded-lg flex items-center justify-between">
				결과
				<div className="text-xs flex-col">
					<KakaoShareButton
						showLink={`${window.location.href.split("/").slice(0, -1).join("/")}/shared`}
					/>
				</div>
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
						<span className="text-orange-500">{timeArr[0]}</span>h{" "}
						<span className="text-orange-500">{timeArr[1]}</span>
						m
						<br />
						<div className="text-sm flex justify-end">내 풀이 시간</div>
					</div>
				</div>
			</div>
			{/* 틀린 문제 */}
			<div className="p-4 w-full border border-dashed border-orange-200 rounded-md my-2">
				<h1 className="text-xl mb-4">틀린 문제 정답률</h1>
				<div className="grid grid-cols-4 items-center gap-2 text-gray-600">
					{testResultInfo.incorrectProblems.map((problem, idx) => (
						<div key={idx} className="flex items-center text-sm">
							{problem.problemNumber}번{" "}
							<span className="inline-block ml-1 text-xs text-orange-500 border border-orange-500 rounded-md px-[2px]">
								{problem.correctRate}%
							</span>
						</div>
					))}
				</div>
			</div>
			{/* 예상 등급 */}
			<div className="w-full border border-dashed border-orange-200 rounded-md p-4">
				<div className="flex gap-4 items-center mb-4">
					<h1 className="text-xl">예상 등급</h1>
					<DropdownMenu
						defaultText={"대성마이맥"}
						ItemObj={{ 대성마이맥: [], 이투스: [] }}
						buttonWidth={"w-30"}
						setData={setRankProvider}
					/>
				</div>
				<div className="w-full flex justify-between mb-4">
					<div className="text-4xl text-orange-500">
						{
							testResultInfo.estimatedRatingGetResponses.find(
								(obj) => obj.ratingProvider === rankProvider
							)?.estimatedRating
						}
						<span className="text-gray-500">등급</span>
					</div>
				</div>
				<div className="w-full">
					<div className="w-full flex text-center py-1 h-10 items-center text-md bg-orange-500 text-white">
						<div className="w-2/12 border-r-2 border-white">등급</div>
						<div className="w-4/12 border-r-2 border-white">원점수</div>
						<div className="w-3/12 border-r-2 border-white">표준점수</div>
						<div className="w-3/12">백분위</div>
					</div>
					{ratingTables[rankProvider]?.slice(0, 8).map((v, i) => (
						<div
							key={i}
							className={`h-12 flex text-center items-center py-1 border-b-2 border-gray-200 ${
								i + 1 ==
								testResultInfo.estimatedRatingGetResponses.find(
									(obj) => obj.ratingProvider === rankProvider
								)?.estimatedRating
									? "bg-orange-200 text-lg"
									: "text-md text-gray-500"
							}`}
						>
							<div className="w-2/12">{v["rating"]}</div>
							<div className="w-4/12">{v["rawScores"]}</div>
							<div className="w-3/12">{v["standardScores"]}</div>
							<div className="w-3/12">{v["percentiles"]}</div>
						</div>
					))}
				</div>
			</div>
			{/* 공유하기 */}
			{/* <div className="p-4 w-full border border-dashed border-orange-200 rounded-md my-2">
				<h1 className="text-xl mb-4">공유하기</h1>
				<div className="flex items-center justify-center">
					<KakaoShareButton
						showLink={`${window.location.href.split("/").slice(0, -1).join("/")}/shared`}
					/>
				</div>
			</div> */}
			<div className="flex justify-center">
				{/* Fixed 상태 버튼 */}
				{isVisible && (
					<button className="fixed w-2/5 bottom-4 bg-orange-500 text-white p-4 text-sm rounded-lg shadow-lg">
						모플 복습서 생성하기
					</button>
				)}
			</div>

			<div className="flex w-full justify-around">
				<button
					className="w-2/5 h-12 mt-4 bg-orange-200 text-orange-500 rounded-lg text-sm"
					onClick={() => router.replace("/searchmo")}
				>
					홈으로 돌아가기
				</button>
				<button
					className="w-2/5 h-12 mt-4 bg-orange-500 text-white rounded-lg text-sm"
					onClick={() => {
						// requestReviewNote();
						router.push("/application");
					}}
				>
					모플 복습서 생성하기
				</button>
			</div>
		</div>
	);
};

export default ResultContainer;
