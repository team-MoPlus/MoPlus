import { SolvetimeContainer } from "@/containers/Solvetime";
import React from "react";

const page = ({ params }: { params: { moId: number } }) => {
	return <SolvetimeContainer moId={params.moId} />;
};

export default page;
