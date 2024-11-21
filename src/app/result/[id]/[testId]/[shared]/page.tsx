"use client";

import ResultContainer from "@/containers/ResultContainer/ResultContainer";
import ResultSharingContainer from "@/containers/ResultContainer/ResultSharingContainer";
import React, { useEffect } from "react";

const page = ({ params }: { params: { id: number; testId: number; shared: string } }) => {
	if (params.shared === "shared")
		return (
			<ResultSharingContainer testResultId={params.id} testId={params.testId} />
		);
	else return <ResultContainer testResultId={params.id} />;
};

export default page;
