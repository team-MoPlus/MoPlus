import React from "react";
import Image from "next/image";
import StarRating from "../Rating/StarRating";
import DifficultyRating from "../Rating/DifficultyRating";

interface ExamItemProps {
	order: number;
	thumbnail: string;
	title: string;
	year: number;
	author: string;
	description: string;
	rating: number;
	difficulty: string;
}

const ExamItem: React.FC<ExamItemProps> = ({
	order,
	thumbnail,
	title,
	year,
	author,
	description,
	rating,
	difficulty,
}) => {
	return (
		<div className="relative flex w-full py-2 border-b border-b-gray-300">
			{/* 순서 */}
			<div className={`text-5xl ${order === 0 ? "text-orange-600" : ""}`}>
				{order + 1}
			</div>

			{/* 썸네일 */}
			<div className="relative w-40 h-36">
				<Image src={thumbnail} alt={title} layout="fill" objectFit="cover" />
			</div>

			{/* 제목, 저자, 설명 */}
			<div className="flex-grow pl-4">
				<h2 className="font-bold text-lg">
					{title} ({year})
				</h2>
				<p className="text-gray-500 text-xs">{author}</p>
				<div className="h-4"></div>
				<p className="text-sm text-gray-700 mt-4 w-3/5">{description}</p>
			</div>

			{/* 평점과 난이도 */}
			<div className="flex flex-col items-center justify-center w-64">
				<div className="flex-col justify-center">
					<DifficultyRating rating={rating} />
				</div>
			</div>
		</div>
	);
};

export default ExamItem;
