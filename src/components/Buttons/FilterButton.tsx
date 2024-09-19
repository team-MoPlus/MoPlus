import React from "react";

interface TextComponentProps {
	text: string;
	width: string | null;
	height: string;
	isSelected: boolean;
	onClick: () => void;
}

const FilterButton = ({
	text,
	width,
	height,
	isSelected,
	onClick,
}: TextComponentProps) => {
	return (
		<input
			type="button"
			value={`${text}`}
			onClick={onClick}
			className={`w-${width} h-${height} text-white py-2 px-4 rounded-3xl cursor-pointer ${
				isSelected ? "bg-orange-500" : "bg-black hover:bg-orange-400"
			}`}
		/>
	);
};

export default FilterButton;
