import React, { useId } from "react";

interface StarRatingProps {
	difficulty: number;
}

const StarRating = ({ difficulty }: StarRatingProps) => {
	const starPercentage = (difficulty / 10) * 100; // 난이도를 0~100%로 변환
	const stars = Math.ceil(starPercentage / 20);
	const idPrefix = useId(); // 고유한 ID를 위한 Prefix 생성

	return (
		<div className="relative flex items-center h-6">
			{/* 채워진 별 */}
			{[...Array(stars)].map((_, i) => (
				<svg
					key={i}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="18"
				>
					{starPercentage / 20 < i + 1 ? (
						<defs>
							<linearGradient
								id={`${idPrefix}-grad-${i}`} // useId를 사용해 고유한 id 생성
								x1="0%"
								y1="0%"
								x2="100%"
								y2="0%"
							>
								<stop
									offset="0%"
									style={{ stopColor: "orange", stopOpacity: 1 }}
								/>
								<stop
									offset={`${(starPercentage - (stars - 1) * 20) * 5}%`}
									style={{ stopColor: "white", stopOpacity: 1 }}
								/>
							</linearGradient>
						</defs>
					) : (
						<defs>
							<linearGradient
								id={`${idPrefix}-grad-${i}`}
								x1="0%"
								y1="0%"
								x2="100%"
								y2="0%"
							>
								<stop
									offset="0%"
									style={{ stopColor: "orange", stopOpacity: 1 }}
								/>
								<stop
									offset="100%"
									style={{ stopColor: "orange", stopOpacity: 1 }}
								/>
							</linearGradient>
						</defs>
					)}
					<path
						fill={`url(#${idPrefix}-grad-${i})`} // SVG 내에서 그라데이션 적용
						d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.776 1.401 8.171L12 18.896l-7.335 3.86 1.401-8.171L.132 9.209l8.2-1.191L12 .587z"
					/>
				</svg>
			))}
		</div>
	);
};

export default StarRating;
