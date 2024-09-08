import { Spinner, Stack } from "@chakra-ui/react";
import React from "react";

const page = () => {
	return (
		<Stack direction="row" spacing={4}>
			<Spinner size="xs" />
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
			<Spinner size="xl" />
		</Stack>
	);
};

export default page;
