"use client";

import React, { useState, useEffect } from "react";

const HourMinutePicker: React.FC = () => {
	const [selectedHour, setSelectedHour] = useState<number>(1); // 초기 선택된 시간
	const [selectedMinute, setSelectedMinute] = useState<number>(1); // 초기 선택된 분

	const hours = Array.from({ length: 24 }, (_, i) => i); // 0부터 23까지의 시간 배열
	const minutes = Array.from({ length: 60 }, (_, i) => i); // 0부터 59까지의 분 배열

	// 스크롤 이벤트 핸들러 (시간 선택)
	const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const scrollTop = e.currentTarget.scrollTop;
		const index = Math.round(scrollTop / 48); // 각 요소의 높이가 48px 기준
		setSelectedHour(index);
	};

	// 스크롤 이벤트 핸들러 (분 선택)
	const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const scrollTop = e.currentTarget.scrollTop;
		const index = Math.round(scrollTop / 48); // 각 요소의 높이가 48px 기준
		setSelectedMinute(index);
	};

	useEffect(() => {
		// 초기 스크롤 위치 설정 (시간)
		const hourPicker = document.getElementById("hour-picker");
		const minutePicker = document.getElementById("minute-picker");
		if (hourPicker && minutePicker) {
			hourPicker.scrollTo(0, selectedHour * 48);
			minutePicker.scrollTo(0, selectedMinute * 48);
		}
	}, [selectedHour, selectedMinute]);

	return (
		<div className="flex justify-center items-center space-x-12 p-4">
			{/* Hour Picker */}
			<div
				id="hour-picker"
				onScroll={handleHourScroll}
				className="w-16 h-48 overflow-y-scroll scroll-snap snap-y snap-mandatory border-r-2 border-gray-300"
			>
				<div className="flex flex-col items-center">
					{hours.map((hour) => (
						<div
							key={hour}
							className={`text-3xl h-12 flex items-center justify-center snap-center ${
								selectedHour === hour ? "text-black font-bold" : "text-gray-400"
							}`}
						>
							{hour}시
						</div>
					))}
				</div>
			</div>

			{/* Minute Picker */}
			<div
				id="minute-picker"
				onScroll={handleMinuteScroll}
				className="w-16 h-48 overflow-y-scroll scroll-snap snap-y snap-mandatory"
			>
				<div className="flex flex-col items-center">
					{minutes.map((minute) => (
						<div
							key={minute}
							className={`text-3xl h-12 flex items-center justify-center snap-center ${
								selectedMinute === minute
									? "text-black font-bold"
									: "text-gray-400"
							}`}
						>
							{minute}분
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HourMinutePicker;
