import { ReactNode } from "react";
import ReactDom from "react-dom";

interface Props {
	children: ReactNode;
}

/**
 * modal 띄울 때 사용하는 함수입니다.
 */
const ModalPortal = ({ children }: Props) => {
	const el = document.getElementById("modal") as HTMLElement;

	return ReactDom.createPortal(children, el);
};

export default ModalPortal;
