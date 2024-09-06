// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

export function Providers({ children }: { children: React.ReactNode }) {
	return <RecoilRoot>{children}</RecoilRoot>;
}
