"use client";

import { Banner } from "@/components/Banner";
import { HourMinutePicker } from "@/components/Tables";
import Link from "next/link";
import React, { useState } from "react";

interface SolvetimeContainerProps {
	moId: number;
}

const SolvetimeContainer = ({ moId }: SolvetimeContainerProps) => {
	const [hour, setHour] = useState<string>("");
	const [minute, setMinute] = useState<string>("");

	// 시간 입력 핸들러
	const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const stringValue = e.target.value;
		if (/^\d{0,1}$/.test(stringValue)) {
			setHour(stringValue);
		}
	};

	// 분 입력 핸들러
	const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const stringValue = e.target.value;
		if (/^\d{0,2}$/.test(stringValue)) {
			setMinute(stringValue);
		}
	};

	return (
		<div className="p-4">
			<Link href="/">
				<Banner />
			</Link>
			<div className="h-16 text-white px-6 my-2 text-xl font-bold bg-orange-600 rounded-lg flex items-center">
				풀이 시간을 입력해주세요!
			</div>
			<div className="w-full h-96 flex gap-2 justify-center items-center">
				<input
					type="number"
					value={hour}
					onChange={handleHourChange}
					className="rounded-lg w-12 h-12 border border-orange-500 text-orange-500 text-2xl text-center focus:outline-none"
				/>
				<div className="text-xl mr-4">시간</div>
				<input
					type="number"
					value={minute}
					onChange={handleMinuteChange}
					className="rounded-lg w-12 h-12 border border-orange-500 text-orange-500 text-2xl text-center focus:outline-none"
				/>
				<div className="text-xl">분</div>
				{/* <HourMinutePicker /> */}
			</div>
			<Link
				href={`/solvetime/${moId}`}
				className="flex justify-center my-4 pb-4"
			>
				<button className="w-64 h-12 bg-orange-200 text-orange-500 rounded-lg">
					입력 완료
				</button>
			</Link>
		</div>
	);
};

export default SolvetimeContainer;
