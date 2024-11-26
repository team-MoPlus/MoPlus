"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LandingContainer = () => {
	const router = useRouter();

	return (
		<div className="flex-col justify-center items-center h-[3500px] bg-gradient-to-b from-[#ffffff] to-[#FC6C02]">
			<Image
				src="/example_images/landing.png"
				width={550}
				height={550}
				alt="랜딩 페이지"
			/>

			<button
				onClick={() => router.push("/searchmo")}
				className="fixed w-64 bottom-5 left-1/2 transform -translate-x-1/2 bg-[#FC6C02] text-white font-bold border-b py-3 px-6 rounded-full shadow-xl text-xl"
			>
				모플 써보러 가기
			</button>
		</div>
	);
};

export default LandingContainer;
