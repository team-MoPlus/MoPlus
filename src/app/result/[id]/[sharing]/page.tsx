import ResultContainer from "@/containers/ResultContainer/ResultContainer";
import ResultSharingContainer from "@/containers/ResultContainer/ResultSharingContainer";
import React from "react";

const page = ({ params }: { params: { id: number; sharing: boolean } }) => {
	if (params.sharing === true)
		return <ResultSharingContainer testResultId={params.id} />;
	else return <ResultContainer testResultId={params.id} />;
};

export default page;
