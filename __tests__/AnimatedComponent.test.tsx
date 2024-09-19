"use client";

import React, { useRef, useState, useEffect } from "react";

const AnimatedComponent = () => {
	const [isActive, setIsActive] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);

	// 이벤트가 끝났을 때 변화 주기
	const handleTransitionEnd = () => {
		console.log("Transition finished!");
		alert("Transition has completed!");
	};

	useEffect(() => {
		const element = elementRef.current;
		if (element) {
			// transitionend 이벤트 등록
			element.addEventListener("transitionend", handleTransitionEnd);
		}

		return () => {
			if (element) {
				// cleanup: 이벤트 제거
				element.removeEventListener("transitionend", handleTransitionEnd);
			}
		};
	}, []);

	return (
		<div>
			<button onClick={() => setIsActive(!isActive)}>Start Animation</button>
			<div
				ref={elementRef}
				className={`w-32 h-32 bg-blue-500 transition-all duration-500 ${
					isActive ? "transform scale-125" : "transform scale-100"
				}`}
			></div>
		</div>
	);
};

export default AnimatedComponent;
