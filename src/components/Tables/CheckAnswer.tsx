"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import {
	TbCircleNumber1,
	TbCircleNumber2,
	TbCircleNumber3,
	TbCircleNumber4,
	TbCircleNumber5,
} from "react-icons/tb";
import {
	TbCircleNumber1Filled,
	TbCircleNumber2Filled,
	TbCircleNumber3Filled,
	TbCircleNumber4Filled,
	TbCircleNumber5Filled,
} from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	incorrectProblemState,
	selectedChoicesState,
	testInfoState,
} from "@/recoil/atoms";
import { TestInfo } from "../../../types/Item";
import { getSubjectDict } from "../../../utils/getSubjectDict";

const CircleNumber = [
	<TbCircleNumber1 key={1} size={30} color="orange" />,
	<TbCircleNumber2 key={2} size={30} color="orange" />,
	<TbCircleNumber3 key={3} size={30} color="orange" />,
	<TbCircleNumber4 key={4} size={30} color="orange" />,
	<TbCircleNumber5 key={5} size={30} color="orange" />,
];

const CircleNumberFilled = [
	<TbCircleNumber1Filled key={1} size={30} color="orange" />,
	<TbCircleNumber2Filled key={2} size={30} color="orange" />,
	<TbCircleNumber3Filled key={3} size={30} color="orange" />,
	<TbCircleNumber4Filled key={4} size={30} color="orange" />,
	<TbCircleNumber5Filled key={5} size={30} color="orange" />,
];

const notify = (missingFromSelected: string[]) => {
	toast.error(`${missingFromSelected}번 문제의 답을 입력하세요.`);
};

const CheckAnswer = ({
	problemCount,
	id,
}: {
	problemCount: number;
	id: number;
}) => {
	const router = useRouter();
	const [selectedChoices, setSelectedChoices] = useRecoilState<{
		[key: number]: number;
	}>(selectedChoicesState);
	const [incorrectProblem, setIncorrectProblem] = useRecoilState(
		incorrectProblemState
	);
	const testInfo = useRecoilValue<TestInfo>(testInfoState);
	const subjectDict = getSubjectDict();

	// 각 질문에 대한 input ref 배열
	const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(30).fill(null));
	const [focusIndex, setFocusIndex] = useState<number>(0);

	const questions = useMemo(
		() => Array.from({ length: problemCount }, (_, i) => i + 1),
		[problemCount]
	);

	// 오답 체크 상태 토글
	const handleCheckToggle = (qNum: number) => {
		setSelectedChoices((prev) =>
			prev.hasOwnProperty(qNum)
				? (() => {
						const { [qNum]: _, ...rest } = prev;
						return rest;
					})()
				: { ...prev, [qNum]: -1 }
		);
		setFocusIndex(qNum - 1);
	};

	// 선지 선택 상태 설정
	const handleChoiceSelect = (index: number, choice: number) => {
		if (selectedChoices.hasOwnProperty(index)) {
			setSelectedChoices((prev) => ({
				...prev,
				[index]: choice,
			}));
		}
	};

	useEffect(() => {
		inputRefs.current[focusIndex]?.focus();
	}, [focusIndex]);

	const handleSubmit = (
		id: number,
		selectedChoices: {
			[key: number]: number;
		}
	) => {
		const wrongProblemArray = Object.entries(selectedChoices).map(
			([key, value]) => ({
				problemNumber: `${key}`,
				incorrectAnswer: `${value}`,
			})
		);
		setIncorrectProblem(wrongProblemArray);

		router.replace(`/solvetime/${id}`);
	};

	const hasAnswerInput = Object.keys(selectedChoices).filter(
		(key) => selectedChoices[parseInt(key)] === -1
	);

	return (
		<div>
			<div className="w-full">
				{/* Table Header */}
				<div className="flex border-b-2 border-orange-300">
					<div className="w-24 px-4 py-2 text-center">오답 체크</div>
					<div className="w-16 px-4 py-2 text-center">번호</div>

					<div className="flex-1 px-4 py-2 text-center">선지 선택</div>
				</div>

				{/* Table Body */}
				<div className="mt-4">
					{questions.map((qNum, index) => (
						<div
							key={index}
							className={`flex my-3 bg-[#fffaf5] ${
								selectedChoices.hasOwnProperty(qNum)
									? "border-2 border-red-500 shadow-lg"
									: ""
							}`}
						>
							{/* 오답 체크 */}
							<div
								className="w-24 py-2 cursor-pointer flex justify-center"
								onClick={() => handleCheckToggle(qNum)}
							>
								<FaCheck
									size={30}
									className={`${
										selectedChoices.hasOwnProperty(qNum)
											? "text-red-500"
											: "text-gray-300"
									}`}
								/>
							</div>
							{/* 번호 */}
							<div className="w-16 px-4 py-3 text-center">{qNum}</div>

							{/* 선지 선택 */}
							<div className="flex-1 py-2">
								{subjectDict[testInfo.subject] === "수학" ? (
									qNum < 16 || (22 < qNum && qNum < 29) ? (
										<div className="flex space-x-2 justify-center">
											{Array(5)
												.fill(null)
												.map((v, i) => (
													<button
														key={i}
														onClick={() => handleChoiceSelect(qNum, i + 1)}
														hidden={!selectedChoices.hasOwnProperty(qNum)}
													>
														{selectedChoices[qNum] === i + 1
															? CircleNumberFilled[i]
															: CircleNumber[i]}
													</button>
												))}
										</div>
									) : (
										<div
											className={`flex justify-center ${
												!selectedChoices.hasOwnProperty(qNum) ? "hidden" : ""
											}`}
										>
											<input
												className="border pl-1 h-8 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-300"
												ref={(el) => {
													inputRefs.current[index] = el;
												}}
												type="text"
												inputMode="numeric"
												pattern="\d*"
												placeholder=""
												size={6}
												onChange={(e) =>
													handleChoiceSelect(qNum, parseInt(e.target.value))
												}
												maxLength={10}
											/>
										</div>
									)
								) : subjectDict[testInfo.subject] === "고1" ||
								  subjectDict[testInfo.subject] === "고2" ? (
									qNum > 21 ? (
										<div
											className={`flex justify-center ${
												!selectedChoices.hasOwnProperty(qNum) ? "hidden" : ""
											}`}
										>
											<input
												className="border pl-1 h-8 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-300"
												ref={(el) => {
													inputRefs.current[index] = el;
												}}
												type="text"
												inputMode="numeric"
												pattern="\d*"
												placeholder=""
												size={6}
												onChange={(e) =>
													handleChoiceSelect(qNum, parseInt(e.target.value))
												}
												maxLength={10}
											/>
										</div>
									) : (
										<div className="flex space-x-2 justify-center">
											{Array(5)
												.fill(null)
												.map((v, i) => (
													<button
														key={i}
														onClick={() => handleChoiceSelect(qNum, i + 1)}
														hidden={!selectedChoices.hasOwnProperty(qNum)}
													>
														{selectedChoices[qNum] === i + 1
															? CircleNumberFilled[i]
															: CircleNumber[i]}
													</button>
												))}
										</div>
									)
								) : (
									<div className="flex space-x-2 justify-center">
										{Array(5)
											.fill(null)
											.map((v, i) => (
												<button
													key={i}
													onClick={() => handleChoiceSelect(qNum, i + 1)}
													hidden={!selectedChoices.hasOwnProperty(qNum)}
												>
													{selectedChoices[qNum] === i + 1
														? CircleNumberFilled[i]
														: CircleNumber[i]}
												</button>
											))}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-center my-4">
				<button
					className="w-64 h-12 bg-orange-200 text-orange-500 rounded-lg"
					onClick={() => {
						Object.values(selectedChoices).includes(-1)
							? notify(hasAnswerInput)
							: handleSubmit(id, selectedChoices);
					}}
				>
					오답 체크 완료
				</button>
				<Toaster />
			</div>
		</div>
	);
};

export default CheckAnswer;
