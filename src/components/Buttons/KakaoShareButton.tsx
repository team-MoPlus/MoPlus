"use client";

import React, { useEffect, useState } from "react";

const KakaoShareButton = ({ showLink }: { showLink: string }) => {
	const [isKakaoReady, setIsKakaoReady] = useState(false);

	useEffect(() => {
		// 클라이언트 사이드에서만 실행
		const loadKakaoSDK = () => {
			if (!window.Kakao) {
				const script = document.createElement("script");
				script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
				script.integrity =
					"sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
				script.crossOrigin = "anonymous";
				script.onload = () => {
					// Kakao SDK 초기화
					if (window.Kakao && !window.Kakao.isInitialized()) {
						window.Kakao.init("ef20adf880423377aab82126d18b27e6"); // 사용하려는 앱의 JavaScript 키
					}
				};
				document.head.appendChild(script);
			} else {
				// Kakao SDK가 이미 로드된 경우
				setIsKakaoReady(true);
			}
		};

		loadKakaoSDK();
	}, []);

	const createKakaoButton = () => {
		if (window.Kakao) {
			console.log(showLink);
			window.Kakao.Share.createDefaultButton({
				container: "#kakaotalk-sharing-btn",
				objectType: "feed",
				content: {
					title: "모플, 쉽고 빠른 모의고사 분석",
					description: "모의고사 풀이 결과를 입력하고 내 위치를 확인해 보세요!",
					imageUrl: "https://ifh.cc/g/DOybBW.jpg",
					link: {
						mobileWebUrl: `${showLink}`,
						webUrl: `${showLink}`,
					},
				},
				buttons: [
					{
						title: "웹으로 보기",
						link: {
							mobileWebUrl: `${showLink}`,
							webUrl: `${showLink}`,
						},
					},
				],
			});
		}
	};

	return (
		<a
			id="kakaotalk-sharing-btn"
			href="javascript:;"
			onClick={createKakaoButton}
		>
			<img
				src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
				alt="카카오톡 공유 보내기 버튼"
			/>
		</a>
	);
};

export default KakaoShareButton;
