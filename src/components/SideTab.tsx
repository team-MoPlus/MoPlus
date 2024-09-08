"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const SideTab = () => {
	const [activeTab, setActiveTab] = useState<number>(0);

	// activeTab이 변경되면 실행되는 효과
	useEffect(() => {
		console.log(`현재 선택된 탭: ${activeTab}`);
	}, [activeTab]); // activeTab이 변경될 때마다 실행

	// 탭을 클릭할 때 active 상태 변경
	const handleTabClick = (tab: number) => {
		setActiveTab(tab);
	};

	return (
		<div className="h-screen w-48 bg-[#fc6202] text-white flex-none top-0 left-0">
			<div className="p-4">
				<h2 className="text-4xl font-medium">모플</h2>
			</div>
			<nav className="flex flex-col mt-10 h-screen">
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
					랭킹
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
					내 모의고사
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
					커뮤니티
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
					오답노트
				</Link>
				<Link
					href="/settings"
					onClick={() => handleTabClick(4)}
					className={`px-4 py-2 h-12 absolute bottom-6 flex items-center text-sm ${
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
					설정
				</Link>
			</nav>
		</div>
	);
};

export default SideTab;
