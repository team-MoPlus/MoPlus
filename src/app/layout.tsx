import { Providers } from "./providers";
import "/styles/globals.css";

import { pretendard } from "../../styles/font";
import SideTab from "@/components/SideTab/SideTab";
import SideTabTest from "../../__tests__/SideTab.test";
import AnimatedComponent from "../../__tests__/AnimatedComponent.test";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "모두의 음식점 | 모-음",
	description: "팀원1, 팀원2, 팀원3, 팀원4",
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
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>

			<body className="h-screen max-w-xl mx-auto overscroll-none">
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
