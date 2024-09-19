import { Providers } from "./providers";
import "../globals.css";
import SideTab from "@/components/SideTab/SideTab";
import SideTabTest from "../../__tests__/SideTab.test";
import AnimatedComponent from "../../__tests__/AnimatedComponent.test";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko">
			<body className="w-screen h-screen">
				<Providers>
					<div className="flex h-full w-full">
						<SideTab />
						{/* <SideTabTest /> */}
						<div className="w-full">{children}</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
