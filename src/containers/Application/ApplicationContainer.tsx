"use client";

import { Banner } from "@/components/Banner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { postApplication } from "../../../apis/application";
import { ApplicationForm, TestResult } from "../../../types/result";
import { testResultState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { getReviewNote } from "../../../apis/testResult";
import { IoChevronBackOutline } from "react-icons/io5";

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

				const reader = new FileReader();

				// Blob을 URL로 변환
				const blob = new Blob([response], { type: "application/pdf" });

				reader.onload = (e) => {
					const url = window.URL.createObjectURL(blob);

					// 링크 생성 및 다운로드 실행
					const link = document.createElement("a");
					link.href = url;
					link.download = `복습서_${variables.name}`; // 다운로드될 파일 이름
					document.body.appendChild(link); // 링크를 문서에 추가
					link.click(); // 링크 클릭
					document.body.removeChild(link); // 링크 제거

					// URL 해제 (메모리 누수 방지)
					window.URL.revokeObjectURL(url);
				};

				reader.readAsDataURL(blob);
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

	useEffect(() => {
		// 스크립트를 동적으로 추가
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.charset = "UTF-8";
		script.innerHTML = `
      var inappdeny_exec_vanillajs = (callback) => {
        if(document.readyState !== 'loading'){
          callback();
        }else{
          document.addEventListener('DOMContentLoaded', callback);
        } 
      };
      inappdeny_exec_vanillajs(() => { 
        function copytoclipboard(val){
          var t = document.createElement("textarea");
          document.body.appendChild(t);
          t.value = val;
          t.select();
          document.execCommand('copy');
          document.body.removeChild(t);
        };
        function inappbrowserout(){
          copytoclipboard(window.location.href);
          alert('URL주소가 복사되었습니다.\\n\\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.');
          location.href='x-web-search://?';
        };

        var useragt = navigator.userAgent.toLowerCase();
        var target_url = location.href;
        
        if(useragt.match(/kakaotalk/i)){
          //카카오톡 외부브라우저로 호출
          location.href = 'kakaotalk://web/openExternal?url='+encodeURIComponent(target_url);
          
        }else if(useragt.match(/line/i)){
          //라인 외부브라우저로 호출
          if(target_url.indexOf('?') !== -1){
            location.href = target_url+'&openExternalBrowser=1';
          }else{
            location.href = target_url+'?openExternalBrowser=1';
          }
          
        }else if(useragt.match(/inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i)){
          
          //그외 다른 인앱들
          if(useragt.match(/iphone|ipad|ipod/i)){
            
            //아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
            var mobile = document.createElement('meta');
            mobile.name = 'viewport';
            mobile.content = "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
            document.getElementsByTagName('head')[0].appendChild(mobile);
            var fonts = document.createElement('link');
            fonts.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap';
            document.getElementsByTagName('head')[0].appendChild(fonts);
            document.body.innerHTML = "<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요</article><button onclick='inappbrowserout();' style='background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;'>Safari로 열기</button><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
          
          }else{
            location.href='intent://'+target_url.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
          }
        }
      });
    `;

		document.body.appendChild(script);
	}, []);

	return (
		<div className="p-4">
			<div className="flex gap-2">
				<IoChevronBackOutline
					size={36}
					className="cursor-pointer"
					onClick={() => router.back()}
				/>
				<Link href="/" className="inline-block">
					<Banner />
				</Link>
			</div>

			{/* Title Section */}
			<div className="h-16 text-white px-6 mt-2 mb-4 text-xl font-bold bg-orange-500 rounded-lg flex items-center">
				모플 복습서 생성
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
			<div className="flex w-full justify-around">
				<button
					className="w-2/5 h-12 mt-4 bg-orange-200 text-orange-500 rounded-lg text-sm"
					onClick={() => router.replace("/searchmo")}
				>
					홈으로 돌아가기
				</button>
				<button
					className="w-2/5 h-12 mt-4 bg-orange-500 text-white rounded-lg text-sm"
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
					생성
				</button>
			</div>
		</div>
	);
};

export default ApplicationContainer;
