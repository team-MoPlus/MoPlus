import Image from "next/image";
import React from "react";

interface ItemCardProps {
	order: number;
	subject: string;
	title: string;
	author: string;
	year: number;
	visited: number;
	solved: number;
}

const ItemCard: React.FC<ItemCardProps> = ({
	order,
	subject,
	title,
	author,
	year,
	visited,
	solved,
}) => {
	return (
		<div className="flex gap-4 items-center w-full h-24 px-4 mb-2 rounded-lg border-2">
			<div className="text-2xl">{order + 1}</div>
			<div>
				<Image
					src="/example_images/emptyMO.png"
					width={40}
					height={40}
					alt="모의고사"
				/>
			</div>
			<div className="grid grid-rows-3">
				<div className="text-md overflow-hidden whitespace-nowrap text-ellipsis max-w-[420px]">
					[{subject}] {title}
				</div>
				<div className=" text-gray-300 text-xs">
					{author} | {year}학년도
				</div>
				<div className="flex gap-2 items-center text-gray-300 text-xs">
					<div className="border rounded-sm w-fit px-2 py-1">
						<span className="text-orange-500">조회수</span> {visited}
					</div>
					<div className="border rounded-sm w-fit px-2 py-1">
						<span className="text-orange-500">풀이수</span> {solved}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
