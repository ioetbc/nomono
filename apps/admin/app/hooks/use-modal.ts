import { useRef } from "react";

export const useModal = () => {
	const modalRef = useRef<HTMLDialogElement | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);

	const reset = () => {
		if (!formRef.current) return;
		formRef.current.reset();
	};

	const open = () => {
		console.log("modalRef.current", modalRef.current);
		if (!modalRef.current) return;
		modalRef.current.showModal();
	};

	const close = () => {
		if (!modalRef.current) return;
		modalRef.current.close();
	};

	const toggle = () => {
		console.log("modalRef toggle", modalRef.current?.open);

		if (!modalRef.current) return;
		!modalRef.current.open ? open() : close();
	};

	return {
		modalRef,
		formRef,
		reset,
		open,
		close,
		toggle,
		isOpen: modalRef.current?.open || false,
	};
};
