import ResultContainer from "@/containers/ResultContainer/ResultContainer";
import React from "react";

const page = ({ params }: { params: { moId: number } }) => {
	return <ResultContainer moId={params.moId} />;
};

export default page;
