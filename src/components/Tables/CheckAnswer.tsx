"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
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

interface CheckAnswerProps {
	problemNumber: number;
	moId: number;
}

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

const CheckAnswer = ({ problemNumber, moId }: CheckAnswerProps) => {
	const [checkedProblems, setCheckedProblems] = useState<number[]>([]); // 오답 체크된 행을 관리하는 상태
	const [selectedChoices, setSelectedChoices] = useState<{
		[key: number]: number | null;
	}>({}); // 선택된 선지를 관리하는 상태

	const questions = Array.from({ length: problemNumber }, (_, i) => i + 1);

	// 오답 체크 상태 토글
	const handleCheckToggle = (index: number) => {
		setCheckedProblems((prev) =>
			prev.includes(index)
				? prev.filter((item) => item !== index)
				: [...prev, index]
		);
	};

	// 선지 선택 상태 설정
	const handleChoiceSelect = (index: number, choice: number) => {
		if (checkedProblems.includes(index)) {
			setSelectedChoices((prev) => ({
				...prev,
				[index]: choice,
			}));
		}
	};

	return (
		<div>
			<table className="table-fixed border-collapse border-spacing-0 border-orange-500 w-full border-2">
				<thead>
					<tr>
						<th className="w-16 border-2 border-orange-400 px-4 py-2">번호</th>
						<th className="w-24 border-2 border-orange-400 px-4 py-2">
							오답 체크
						</th>
						<th className="border-2 border-orange-400 px-4 py-2">선지 선택</th>
					</tr>
				</thead>
				<tbody>
					{questions.map((value, index) => (
						<tr key={index}>
							<td className="w-16 text-center border-2 border-orange-400 px-4 py-2">
								{value}
							</td>
							<td
								className="border-2 border-orange-400 py-2 cursor-pointer"
								onClick={() => handleCheckToggle(value)}
							>
								<FaCheck
									size={30}
									className={`mx-auto ${checkedProblems.includes(value) ? "text-orange-500" : "text-gray-300"}`}
								/>
							</td>
							<td className="border-2 border-orange-400 pl-4">
								{Array(5)
									.fill(null)
									.map((v, i) => (
										<button
											key={i}
											onClick={() => handleChoiceSelect(value, i)}
											hidden={!checkedProblems.includes(value)}
										>
											{selectedChoices[value] === i
												? CircleNumberFilled[i]
												: CircleNumber[i]}
										</button>
									))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Link
				href={`/solvetime/${moId}`}
				className="flex justify-center my-4 pb-4"
			>
				<button className="w-64 h-12 bg-orange-200 text-orange-500 rounded-lg">
					오답 체크 완료
				</button>
			</Link>
		</div>
	);
};

export default CheckAnswer;
