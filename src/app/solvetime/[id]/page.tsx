import { SolvetimeContainer } from "@/containers/Solvetime";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
	return <SolvetimeContainer testId={params.id} />;
};

export default page;
