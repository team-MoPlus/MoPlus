import Image from "next/image";

export default function Page() {
	return (
		<div className="flex-col items-center h-[4000px] bg-gradient-to-b from-[#ffffff] to-[#FC6C02]">
			<Image
				src="/example_images/landing.png"
				width={550}
				height={550}
				alt="랜딩 페이지"
				layout="responsive"
			/>

			<button className="fixed w-[400px] h-14 bottom-12 left-1/2 transform -translate-x-1/2 bg-[#FC6C02] hover:bg-gray-100 text-white hover:text-[#FC6C02] font-bold border-b py-3 px-6 rounded-full shadow-xl text-xl">
				모플 써보러 가기
			</button>
		</div>
	);
}
