import React from "react";
import Image from "next/image";

interface ExamItemProps {
	thumbnail: string;
	title: string;
	year: number;
	author: string;
	description: string;
	rating: number;
	difficulty: string;
}

const ExamItem: React.FC<ExamItemProps> = ({
	thumbnail,
	title,
	year,
	author,
	description,
	rating,
	difficulty,
}) => {
	return (
		<div className="flex border-b pb-4 mb-4">
			{/* 썸네일 */}
			<div className="relative w-24 h-32">
				<Image src={thumbnail} alt={title} layout="fill" objectFit="cover" />
			</div>

			{/* 제목, 저자, 설명 */}
			<div className="flex-grow pl-4">
				<h2 className="font-bold text-lg">
					{title} ({year})
				</h2>
				<p className="text-gray-500">{author}</p>
				<p className="text-sm text-gray-700 mt-2">{description}</p>
			</div>

			{/* 평점과 난이도 */}
			<div className="flex flex-col items-end justify-between">
				{/* 평점 */}
				<div className="text-right">
					<span className="text-2xl font-bold">{rating.toFixed(1)}/10</span>
				</div>

				{/* 난이도 */}
				<div className="flex items-center mt-2">
					<span className="text-orange-400 text-lg">⭐⭐⭐⭐</span>
					<span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded">
						{difficulty}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ExamItem;
