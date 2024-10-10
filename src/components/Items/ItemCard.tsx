import Image from "next/image";
import React from "react";
import { TestInfo } from "../../../types/Item";

interface ItemCardProps {
	mo: TestInfo;
	order: number;
	onClick: () => void;
}

const ItemCard = ({ mo, order, onClick }: ItemCardProps) => {
	return (
		<div
			onClick={onClick}
			className="flex gap-4 items-center w-full h-24 px-4 mb-2 rounded-lg border-2 cursor-pointer"
		>
			<div className="text-2xl">{order}</div>
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
					[{mo.subject}] {mo.name}
				</div>
				<div className=" text-gray-500 text-xs">{mo.provider}</div>
				<div className="flex gap-2 items-center text-gray-800 text-xs">
					<div className="border rounded-sm w-fit px-2 py-1">
						<span className="text-orange-500">조회수</span> {mo.viewCount}
					</div>
					<div className="border rounded-sm w-fit px-2 py-1">
						<span className="text-orange-500">풀이수</span>{" "}
						{mo.totalSolvesCount}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
