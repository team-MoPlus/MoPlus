import { Banner } from "@/components/Banner";
import { CheckAnswer } from "@/components/Tables";
import Link from "next/link";
import React from "react";

interface AnswerContainerProps {
	moId: number;
}

const AnswerContainer = ({ moId }: AnswerContainerProps) => {
	return (
		<div className="p-4">
			<Link href="/" className="inline-block">
				<Banner />
			</Link>
			<div className="h-16 text-white px-6 my-2 text-xl font-bold bg-orange-400 rounded-lg flex items-center">
				오답을 체크하고 답을 입력하세요!
			</div>
			<CheckAnswer problemNumber={40} moId={moId} />
		</div>
	);
};

export default AnswerContainer;
