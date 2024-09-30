import { Providers } from "./providers";
import "/styles/globals.css";
import { pretendard } from "../../styles/font";
import SideTab from "@/components/SideTab/SideTab";
import SideTabTest from "../../__tests__/SideTab.test";
import AnimatedComponent from "../../__tests__/AnimatedComponent.test";

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
						<div className="w-full">{children}</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
