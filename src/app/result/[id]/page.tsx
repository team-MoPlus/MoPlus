import ResultContainer from "@/containers/ResultContainer/ResultContainer";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
	return <ResultContainer testResultId={params.id} />;
};

export default page;
