import { Providers } from "./providers";
import "/styles/globals.css";

import { pretendard } from "../../styles/font";
import { Metadata } from "next";
import GoogleAnalytics from "../../lib/GoogleAnalytics";

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
				<GoogleAnalytics />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>

			<body className="h-screen max-w-lg mx-auto overscroll-none">
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-MT5SX4T7"
						height="0"
						width="0"
					>
						<style jsx>{`
							style= {
								display: none;
								visibility: hidden;
							}
						`}</style>
					</iframe>
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
