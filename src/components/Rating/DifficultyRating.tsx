import React from "react";
import StarRating from "./StarRating";

const DifficultyRating = ({ rating }: { rating: number }) => {
	return (
		<div className="text-center">
			<p className="text-3xl font-bold">{rating.toFixed(1)}/10</p>
			<StarRating difficulty={rating} />
			<div className="flex items-center justify-center mt-2 border rounded-full">
				<span className="text-lg">😟</span>
				<span className="ml-2 py-1 text-sm">어려움</span>
			</div>
		</div>
	);
};

export default DifficultyRating;
