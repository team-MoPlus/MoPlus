import AnswerContainer from "@/containers/Answer/AnswerContainer";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
	return <AnswerContainer id={params.id} />;
};

export default page;
