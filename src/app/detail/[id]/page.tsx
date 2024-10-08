import { MoDetailContainer } from "@/containers/MoDetail";
import { useRouter } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
	return <MoDetailContainer id={params.id} />;
};

export default page;
