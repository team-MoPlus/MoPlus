"use client";

import React, { useState } from "react";

const SideTabTest = () => {
	// 사이드바 상태를 관리하는 useState
	const [isOpen, setIsOpen] = useState(true);

	// 사이드바 열고 닫는 함수
	const toggleSideTabTest = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex">
			{/* SideTabTest */}
			<div
				className={`bg-orange-500 text-white h-screen ${
					isOpen ? "w-64" : "w-16"
				} duration-300 relative`}
			>
				{/* 닫힘 상태에서 '모플' 위에 있는 클릭 가능한 영역 */}
				{!isOpen && (
					<button
						onClick={toggleSideTabTest}
						className="absolute top-4 left-4 focus:outline-none"
					>
						<div className="w-8 h-8 bg-gray-300"></div>
					</button>
				)}

				{/* 열림 상태에서의 콘텐츠 */}
				{isOpen ? (
					<div className="p-4">
						<div className="flex justify-between items-center">
							<h1 className="text-lg font-bold">모플</h1>
							<button
								onClick={toggleSideTabTest}
								className="focus:outline-none"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<ul className="mt-8">
							<li className="flex items-center p-2 hover:bg-orange-400 rounded">
								<span className="material-icons">home</span>
								<span className="ml-4">영업</span>
							</li>
							<li className="flex items-center p-2 hover:bg-orange-400 rounded">
								<span className="material-icons">music_note</span>
								<span className="ml-4">내 모의고사</span>
							</li>
							<li className="flex items-center p-2 hover:bg-orange-400 rounded">
								<span className="material-icons">people</span>
								<span className="ml-4">커뮤니티</span>
							</li>
							<li className="flex items-center p-2 hover:bg-orange-400 rounded">
								<span className="material-icons">note</span>
								<span className="ml-4">오답노트</span>
							</li>
						</ul>

						<ul className="absolute bottom-4 left-4">
							<li className="flex items-center p-2 hover:bg-orange-400 rounded">
								<span className="material-icons">settings</span>
								<span className="ml-4">설정</span>
							</li>
							<li className="flex items-center p-2 hover:bg-orange-400 rounded">
								<span className="material-icons">logout</span>
								<span className="ml-4">로그아웃</span>
							</li>
						</ul>
					</div>
				) : (
					// 닫힘 상태에서의 아이콘만 표시
					<div className="p-4">
						<ul className="space-y-4">
							<li className="flex justify-center items-center">
								<span className="material-icons">home</span>
							</li>
							<li className="flex justify-center items-center">
								<span className="material-icons">music_note</span>
							</li>
							<li className="flex justify-center items-center">
								<span className="material-icons">people</span>
							</li>
							<li className="flex justify-center items-center">
								<span className="material-icons">note</span>
							</li>
						</ul>

						<ul className="absolute bottom-4 left-2">
							<li className="flex justify-center items-center">
								<span className="material-icons">settings</span>
							</li>
							<li className="flex justify-center items-center">
								<span className="material-icons">logout</span>
							</li>
						</ul>
					</div>
				)}
			</div>

			{/* 메인 콘텐츠 */}
			<div className="flex-grow p-8 bg-gray-800 text-white">
				<h1>메인 콘텐츠 영역</h1>
				<p>이곳에 주된 내용을 표시합니다.</p>
			</div>
		</div>
	);
};

export default SideTabTest;
