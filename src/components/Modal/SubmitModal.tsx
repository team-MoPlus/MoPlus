"use client";

import { incorrectProblemState } from "@/recoil/atoms";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

interface SubmitModalProps {
	onClose: () => void;
	onClick: () => void;
}

const SubmitModal = ({ onClose, onClick }: SubmitModalProps) => {
	const router = useRouter();
	const incorrectProblem = useRecoilValue(incorrectProblemState);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
				<h2 className="text-xl font-bold mb-2">제출하면 수정할 수 없습니다.</h2>
				<p>제출하시겠습니까?</p>
				<div className="text-md mb-6">
					틀린 개수: {incorrectProblem.length}개
				</div>
				<div className="flex gap-2">
					<button
						className="bg-gray-400 w-1/2 text-white py-2 px-4 rounded-lg"
						onClick={onClose}
					>
						닫기
					</button>
					<button
						className="bg-orange-500 w-1/2 text-white py-2 px-4 rounded-lg"
						onClick={onClick}
					>
						제출
					</button>
				</div>
			</div>
		</div>
	);
};

export default SubmitModal;
