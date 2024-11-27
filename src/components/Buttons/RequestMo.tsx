import Image from "next/image";
import Link from "next/link";
import React from "react";

const RequestMo = () => {
	return (
		<Link href="https://forms.gle/gp4jfAeqs5FYZd9b6">
			<div className="w-20 h-20 flex-col items-center justify-center text-orange-500 border-orange-300 border rounded-xl pt-2">
				<Image
					src="/icons/request.svg"
					width={30}
					height={30}
					alt="request"
					className="mx-auto block"
				/>
				<div className="text-xs text-center">
					불편사항 <br /> 접수
				</div>
			</div>
		</Link>
	);
};

export default RequestMo;
