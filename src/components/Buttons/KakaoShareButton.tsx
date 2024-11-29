"use client";

import React, { useEffect, useState } from "react";

const KakaoShareButton = ({ showLink }: { showLink: string }) => {
	const [isKakaoReady, setIsKakaoReady] = useState(false);

	useEffect(() => {
		const loadKakaoSDK = () => {
			if (!window.Kakao) {
				const script = document.createElement("script");
				script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
				script.integrity =
					"sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
				script.crossOrigin = "anonymous";
				script.onload = () => {
					if (window.Kakao && !window.Kakao.isInitialized()) {
						window.Kakao.init("ef20adf880423377aab82126d18b27e6");
					}
					setIsKakaoReady(true); // SDK가 로드된 후 설정
				};
				document.head.appendChild(script);
			} else {
				setIsKakaoReady(true);
			}
		};

		loadKakaoSDK();
	}, []);

	const handleKakaoShare = () => {
		if (isKakaoReady && window.Kakao) {
			window.Kakao.Share.sendDefault({
				objectType: "feed",
				content: {
					title: "모플, 쉽고 빠른 모의고사 분석",
					description: "모의고사 풀이 결과를 입력하고 내 위치를 확인해 보세요!",
					imageUrl: "https://ifh.cc/g/jT2Gcd.jpg",
					link: {
						mobileWebUrl: showLink,
						webUrl: showLink,
					},
				},
				buttons: [
					{
						title: "웹으로 보기",
						link: {
							mobileWebUrl: showLink,
							webUrl: showLink,
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
			onClick={handleKakaoShare}
		>
			<img
				src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
				alt="카카오톡 공유 보내기 버튼"
				style={{ width: "28px", height: "28px" }}
			/>
		</a>
	);
};

export default KakaoShareButton;
