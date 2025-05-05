import { useRef } from "react";

export const useModal = () => {
	const modal_ref = useRef<HTMLDialogElement | null>(null);
	const form_ref = useRef<HTMLFormElement | null>(null);

	const reset = () => {
		if (!form_ref.current) return;
		form_ref.current.reset();
	};

	const open = () => {
		if (!modal_ref.current) return;
		modal_ref.current.showModal();
	};

	const close = () => {
		if (!modal_ref.current) return;
		modal_ref.current.close();
	};

	const toggle = () => {
		if (!modal_ref.current) return;
		!modal_ref.current.open ? open() : close();
	};

	return {
		modal_ref,
		form_ref,
		reset,
		open,
		close,
		toggle,
		is_open: modal_ref.current?.open || false,
	};
};
