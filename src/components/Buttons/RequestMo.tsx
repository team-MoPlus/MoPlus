import Image from "next/image";
import React from "react";

const RequestMo = () => {
	return (
		<div className="w-20 h-20 flex-col items-center justify-center text-orange-500 border-orange-300 border rounded-xl pt-2">
			<Image
				src="/icons/request.svg"
				width={30}
				height={30}
				alt="request"
				className="mx-auto block"
			/>
			<div className="text-xs text-center">
				모의고사 <br /> 추가 요청
			</div>
		</div>
	);
};

export default RequestMo;
