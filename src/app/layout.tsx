import { Providers } from "./providers";
import "../globals.css";
import SideTab from "@/components/SideTab";

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
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
