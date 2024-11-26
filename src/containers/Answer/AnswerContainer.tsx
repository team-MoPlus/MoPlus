"use client";

import { Banner } from "@/components/Banner";
import { CheckAnswer } from "@/components/Tables";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TestInfo } from "../../../types/Item";
import { ProblemCount } from "../../../utils/problemCount";
import { useRecoilValue } from "recoil";
import { testInfoState } from "@/recoil/atoms";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const AnswerContainer = ({ id }: { id: number }) => {
	const testInfo = useRecoilValue<TestInfo>(testInfoState);
	const router = useRouter();

	return (
		<div className="p-4">
			<div className="h-16 text-white my-2 text-xl font-bold bg-orange-500 rounded-lg flex items-center">
				<IoChevronBackOutline
					size={36}
					className="cursor-pointer relative left-2"
					onClick={() => router.back()}
				/>
				<h1 className="text-center flex-1">오답을 체크하고 답을 입력하세요!</h1>
				<div className="w-6"></div>
			</div>
			<CheckAnswer problemCount={ProblemCount[testInfo.subject]} id={id} />
		</div>
	);
};

export default AnswerContainer;
