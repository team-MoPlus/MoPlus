import AnswerContainer from "@/containers/Answer/AnswerContainer";
import React from "react";

const page = ({ params }: { params: { moId: number } }) => {
	return <AnswerContainer moId={params.moId} />;
};

export default page;
