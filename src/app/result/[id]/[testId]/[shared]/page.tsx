"use client";

import ResultContainer from "@/containers/ResultContainer/ResultContainer";
import ResultSharingContainer from "@/containers/ResultContainer/ResultSharingContainer";
import React, { useEffect } from "react";

const page = ({
	params,
}: {
	params: { id: number; testId: number; shared: string };
}) => {
	if (params.shared === "personal")
		return <ResultContainer testResultId={params.id} />;
	else
		return (
			<ResultSharingContainer testId={params.id} testResultId={params.testId} />
		);
};

export default page;
