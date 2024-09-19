"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const SideTab = () => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [isFinished, setIsFinished] = useState<boolean>(true);

	const elementRef = useRef<HTMLDivElement>(null);

	// activeTab이 변경되면 실행되는 효과
	useEffect(() => {}, [activeTab]); // activeTab이 변경될 때마다 실행

	// 탭을 클릭할 때 active 상태 변경
	const handleTabClick = (tab: number) => {
		setActiveTab(tab);
	};

	const startEvent = () => {
		setIsFinished(false);
		setIsOpen(!isOpen);
		// 3초 후에 변화를 줌 (duration: 300ms)
		setTimeout(() => {
			setIsFinished(!isOpen);
		}, 300); // 3초 후에 변화
	};

	return (
		<div
			ref={elementRef}
			className={`h-full ${isOpen ? "w-64" : "w-16"} bg-[#ff8834fa] text-white flex-col duration-300`}
		>
			<div className="p-4 pl-3 pr-3 flex items-center justify-between">
				<h2 className={`text-3xl font-normal ${isOpen ? "" : "hidden"}`}>
					{isFinished ? "모플" : ""}
				</h2>
				<div className="w-10 h-10 flex justify-center items-center">
					<svg
						onClick={startEvent}
						className="cursor-pointer"
						width="32"
						height="32"
						viewBox="0 0 28 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="2.75"
							y="2.75"
							width="24"
							height="18.5"
							stroke="white"
							strokeWidth="1.5"
						/>
						<rect x="8" y="3" width="1.5" height="18" fill="white" />
					</svg>
				</div>
			</div>
			<div className="flex-none mt-20">
				<Link
					href="/ranking"
					onClick={() => handleTabClick(0)}
					className={`px-4 py-2 h-12 flex items-center text-sm ${
						activeTab === 0
							? "border-l-2 border-white text-white"
							: "border-l-2 border-transparent opacity-45"
					}`}
				>
					<Image
						src="/icons/ranking.png"
						alt="랭킹"
						width={30}
						height={10}
						className="mr-4"
					/>
					{isFinished ? "랭킹" : ""}
				</Link>
				<Link
					href="/mymopl"
					onClick={() => handleTabClick(1)}
					className={`px-4 py-2 h-12 flex items-center text-sm ${
						activeTab === 1
							? "border-l-2 border-white text-white"
							: "border-l-2 border-transparent opacity-45"
					}`}
				>
					<Image
						src="/icons/mymopl.png"
						alt="내모의고사"
						width={30}
						height={10}
						className="mr-4"
					/>
					{isFinished ? "내 모의고사" : ""}
				</Link>
				<Link
					href="/community"
					onClick={() => handleTabClick(2)}
					className={`px-4 py-2 h-12 flex items-center text-sm ${
						activeTab === 2
							? "border-l-2 border-white text-white"
							: "border-l-2 border-transparent opacity-45"
					}`}
				>
					<Image
						src="/icons/community.png"
						alt="커뮤니티"
						width={30}
						height={20}
						className="mr-4"
					/>
					{isFinished ? "커뮤니티" : ""}
				</Link>
				<Link
					href="/reviews"
					onClick={() => handleTabClick(3)}
					className={`px-4 py-2 h-12 flex items-center text-sm ${
						activeTab === 3
							? "border-l-2 border-white text-white"
							: "border-l-2 border-transparent opacity-45"
					}`}
				>
					<Image
						src="/icons/reviews.png"
						alt="오답노트"
						width={30}
						height={20}
						className="mr-4"
					/>
					{isFinished ? "오답노트" : ""}
				</Link>
			</div>
			<Link
				href="/settings"
				onClick={() => handleTabClick(4)}
				className={`w-full px-4 py-2 h-12 absolute bottom-8 flex items-center text-sm ${
					activeTab === 4
						? "border-l-2 border-white text-white"
						: "border-l-2 border-transparent opacity-45"
				}`}
			>
				<Image
					src="/icons/settings.png"
					alt="설정"
					width={30}
					height={20}
					className="mr-4"
				/>
				{isFinished ? "설정" : ""}
			</Link>
		</div>
	);
};

export default SideTab;
