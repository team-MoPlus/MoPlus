"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
	return (
		<>
			<Script
				id="google-tag-manager"
				strategy="afterInteractive" // 페이지 로드 후 실행
				dangerouslySetInnerHTML={{
					__html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MT5SX4T7');
          `,
				}}
			/>
		</>
	);
}
