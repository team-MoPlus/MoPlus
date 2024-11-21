"use client";

import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
	defaultText: string;
	ItemObj: { [key: string]: string[] }; // ItemObj는 문자열 배열을 가지는 객체 타입
	buttonWidth: string;
	setData: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownMenu = ({
	defaultText,
	ItemObj,
	buttonWidth,
	setData,
}: DropdownProps) => {
	const [width, setWidth] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [text, setText] = useState(defaultText);
	const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 영역을 참조하는 ref
	const referenceDivRef = useRef<HTMLButtonElement>(null); // 과목 메뉴 width

	const clickMenu = (e: React.MouseEvent<HTMLElement>) => {
		setIsOpen(false);
		setText((e.target as HTMLDivElement).innerText);
		setData((e.target as HTMLDivElement).innerText);
	};

	// 외부 클릭 감지
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	// 참조된 버튼의 너비를 가져와 드롭다운 너비를 동일하게 설정
	useEffect(() => {
		if (referenceDivRef.current) {
			setWidth(referenceDivRef.current.offsetWidth);
		}
	}, [isOpen]);

	return (
		<div
			className="relative inline-block cursor-pointer mr-2"
			ref={dropdownRef}
		>
			<button
				ref={referenceDivRef}
				onClick={() => setIsOpen(!isOpen)}
				className={`text-orange-500 border border-orange-600 px-1 bg-white flex items-center text-sm justify-between rounded-md ${buttonWidth} ${isOpen ? "rounded-b-none border-b-0" : ""}`}
			>
				{text}
				<span className="ml-2">
					{!isOpen ? (
						// 위쪽 화살표 SVG (드롭다운이 열렸을 때)
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					) : (
						// 아래쪽 화살표 SVG (드롭다운이 닫혀있을 때)
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 15l7-7 7 7"
							/>
						</svg>
					)}
				</span>
			</button>

			{isOpen && (
				<div
					className={`absolute left-0 bg-white text-orange-500 z-10 rounded-b-md border border-orange-500`}
					style={{ width: `${width}px` }}
				>
					<ul className="flex flex-col text-xs">
						{Object.keys(ItemObj).map((subject, index) => {
							const listSize = Object.keys(ItemObj).length;

							return (
								<li key={subject} className="relative group">
									<div
										onClick={clickMenu}
										className={`pl-2 py-2 ${
											index === listSize - 1 ? "rounded-b-md" : ""
										}`}
									>
										{subject}
									</div>
									{ItemObj[subject].length > 0 && (
										<div className="absolute left-full w-48 top-0 bg-black text-white rounded-b-2xl rounded-tr-2xl hidden group-hover:block">
											<ul>
												{ItemObj[subject].map((sub, index) => (
													<li
														key={sub}
														onClick={clickMenu}
														className={`px-4 py-2 hover:bg-orange-400 ${
															index === ItemObj[subject].length - 1
																? "rounded-b-2xl"
																: index === 0
																	? "rounded-tr-2xl"
																	: ""
														}`}
													>
														{sub}
													</li>
												))}
											</ul>
										</div>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;
