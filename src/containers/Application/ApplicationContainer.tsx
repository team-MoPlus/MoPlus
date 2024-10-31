"use client";

import { Banner } from "@/components/Banner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { postApplication } from "../../../apis/application";
import { ApplicationForm, TestResult } from "../../../types/result";
import { testResultState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

// 한글 완성 여부를 확인하는 함수
const isKoreanComplete = (input: string): boolean => {
	const completeKoreanRegex = /^[가-힣]*$/; // 완성된 한글
	const incompleteKoreanRegex = /[ㄱ-ㅎㅏ-ㅣ]/; // 미완성 자모

	if (completeKoreanRegex.test(input)) {
		return true; // 모두 완성된 한글일 경우
	}
	if (incompleteKoreanRegex.test(input)) {
		return false; // 미완성 자모가 포함된 경우
	}

	return true; // 한글 이외의 문자는 검사 제외
};

const notifyNameError = () => toast.error("유효하지 않은 이름입니다.");
const notifyPhoneNumberError = () =>
	toast.error("유효하지 않은 전화번호입니다.");

const ApplicationContainer = () => {
	const router = useRouter();

	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const testResult = useRecoilValue<TestResult>(testResultState);
	const [reviewNote, setReviewNote] = useState<boolean>(false);

	// 	toast.promise(
	// ,
	// 		{
	// 			loading: "복습서 생성 중입니다...",
	// 			success: <b>생성 완료되었습니다!</b>,
	// 			error: <b>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</b>,
	// 		}
	// 	);

	// 입력 시 숫자만 허용
	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const inputValue = e.currentTarget.value;
		// 숫자만 남기고 나머지 문자 제거
		e.currentTarget.value = inputValue.replace(/[^0-9]/g, "");
		setPhoneNumber(e.currentTarget.value); // 상태 업데이트
	};

	// 유효한 이름 입력
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setName(value);
	};

	const sendApplication = ({
		testResultId,
		name,
		phoneNumber,
	}: ApplicationForm) => {
		postApplication({ testResultId, name, phoneNumber });
		router.replace("/searchmo");
	};

	return (
		<div className="p-4">
			<Link href="/" className="inline-block">
				<Banner />
			</Link>

			{/* Title Section */}
			<div className="h-16 text-white px-6 mt-2 mb-4 text-xl font-bold bg-orange-600 rounded-lg flex items-center">
				상세 분석 분석표 신청
			</div>

			{/* Form Section */}
			{/* Name Field */}
			<label className="block text-orange-500 font-semibold mb-1">이름</label>
			<input
				type="text"
				placeholder=""
				onChange={handleNameChange}
				className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
			/>

			{/* Phone Number Field */}
			<label className="block text-orange-500 font-semibold mb-1">
				전화번호
			</label>
			<input
				type="text"
				inputMode="numeric"
				pattern="\d*"
				maxLength={11}
				onInput={handleInput}
				placeholder=""
				className="w-full mb-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
			/>

			{/* 복습서 미리보기 */}
			<label className="block text-orange-500 font-semibold mb-1">
				복습서 미리보기
			</label>

			{/* Submit Button */}
			<div className="flex justify-center">
				<button
					className="w-64 h-12 bg-orange-200 text-orange-500 rounded-lg"
					onClick={() => {
						isKoreanComplete(name)
							? phoneNumber.length < 10
								? notifyPhoneNumberError()
								: sendApplication({
										testResultId: testResult.id,
										name,
										phoneNumber,
									})
							: notifyNameError();
					}}
				>
					신청
				</button>
			</div>
			<Toaster />
		</div>
	);
};

export default ApplicationContainer;
