import { Providers } from "./providers";
import "/styles/globals.css";

import { pretendard } from "../../styles/font";
import { Metadata } from "next";
import GoogleAnalytics from "../../lib/GoogleAnalytics";
import Script from "next/script";

export const metadata: Metadata = {
	title: "모플, 쉽고 빠른 모의고사 분석",
	icons: {
		icon: "/favi.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko" className={pretendard.className}>
			<head>
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
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>

			<body className="h-screen max-w-lg mx-auto overscroll-none">
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-MT5SX4T7"
						height="0"
						width="0"
						className="hidden invisible"
					></iframe>
				</noscript>
				<Providers>
					<div className="flex h-full w-full">
						{/* <SideTab /> */}
						<div className="w-full pt-4">
							{children}
							<div id="modal"></div>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
