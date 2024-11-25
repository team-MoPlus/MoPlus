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
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { sendDetailResultApplication } from "../../../apis/application";
import { getReviewNote } from "../../../apis/testResult";

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

	// const handleDownload = async (name: string) => {
	// 	try {
	// 		// 서버에서 PDF 요청
	// 		const response = await getReviewNote(name);

	// 		// Blob을 URL로 변환
	// 		const blob = new Blob([response], { type: "application/pdf" });
	// 		const url = window.URL.createObjectURL(blob);

	// 		// 링크 생성 및 다운로드 실행
	// 		const link = document.createElement("a");
	// 		link.href = url;
	// 		link.download = `복습서_${name}`; // 다운로드될 파일 이름
	// 		document.body.appendChild(link); // 링크를 문서에 추가
	// 		link.click(); // 링크 클릭
	// 		document.body.removeChild(link); // 링크 제거

	// 		// URL 해제 (메모리 누수 방지)
	// 		window.URL.revokeObjectURL(url);
	// 	} catch (error) {
	// 		console.error("Error downloading PDF:", error);
	// 		alert("PDF 다운로드 중 오류가 발생했습니다.");
	// 	}
	// };

	const DetailResultMutation = useMutation({
		mutationFn: (params: {
			testResultId: number;
			name: string;
			phoneNumber: string;
		}) => postApplication(params),
		onSuccess: async (data, variables) => {
			try {
				// 서버에서 PDF 요청
				const response = await getReviewNote(data, variables.name);
				// Blob을 URL로 변환
				const blob = new Blob([response], { type: "application/pdf" });
				const url = window.URL.createObjectURL(blob);
				// 링크 생성 및 다운로드 실행
				const link = document.createElement("a");
				link.href = url;
				link.download = `복습서_${name}`; // 다운로드될 파일 이름
				document.body.appendChild(link); // 링크를 문서에 추가
				link.click(); // 링크 클릭
				document.body.removeChild(link); // 링크 제거
				// URL 해제 (메모리 누수 방지)
				window.URL.revokeObjectURL(url);
			} catch (error) {
				console.error("Error downloading PDF:", error);
				alert("PDF 다운로드 중 오류가 발생했습니다.");
			}
		},
		// 에러 핸들링 (optional)
		onError: (error) => {
			console.error("Error posting data:", error);
			alert("There was an error submitting your solved time.");
		},

		// 요청이 완료되면 실행 (성공 또는 실패와 무관)
		onSettled: () => {
			// console.log("Request has been processed.");
		},
	});

	return (
		<div className="p-4">
			<Link href="/" className="inline-block">
				<Banner />
			</Link>

			{/* Title Section */}
			<div className="h-16 text-white px-6 mt-2 mb-4 text-xl font-bold bg-orange-500 rounded-lg flex items-center">
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
			<div>
				<Image
					src="/example_images/reviewnote_preview.png"
					alt="example"
					width={500}
					height={200}
				/>
			</div>

			{/* Submit Button */}
			<div className="flex justify-center">
				<button
					className="w-64 h-12 bg-orange-200 text-orange-500 rounded-lg"
					onClick={async () => {
						if (isKoreanComplete(name)) {
							if (phoneNumber.length < 10) {
								notifyPhoneNumberError();
							} else {
								await DetailResultMutation.mutateAsync({
									testResultId: testResult.testResultId,
									name,
									phoneNumber,
								});
								// handleDownload(name);
							}
						} else {
							notifyNameError();
						}
					}}
				>
					신청
				</button>
			</div>
		</div>
	);
};

export default ApplicationContainer;
