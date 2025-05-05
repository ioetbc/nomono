import { type DialogHTMLAttributes, type FC, forwardRef } from "react";

type Props = {} & DialogHTMLAttributes<HTMLDialogElement>;

export const Modal = forwardRef<HTMLDialogElement, Props>(
	({ children, ...props }, ref) => {
		return (
			<dialog
				ref={ref}
				className="relative min-w-56 min-h-56 p-4 rounded-md"
				id="modal"
				{...props}
			>
				<form
					id="modal-form"
					method="dialog"
					className="w-full h-full flex flex-col gap-4 items-center justify-between"
				>
					{children}
				</form>
			</dialog>
		);
	},
);

type BodyProps = {
	children: React.ReactNode;
};

export const Body: FC<BodyProps> = ({ children }) => {
	return <section className="h-full w-full grid gap-4">{children}</section>;
};

type FooterProps = {
	children: React.ReactNode;
};

export const Footer: FC<FooterProps> = ({ children }) => {
	return (
		<section className="w-full flex justify-end gap-2">{children}</section>
	);
};

type TitleProps = {
	children: React.ReactNode;
};

export const Title: FC<TitleProps> = ({ children }) => {
	return <section className="font-bold text-xl w-full">{children}</section>;
};

type FieldProps = {
	name?: string;
	children: React.ReactNode | React.ReactNode[];
};

export const Field: FC<FieldProps> = ({ children, name }) => {
	return (
		<div className="flex flex-col h-max w-full gap-2">
			<label className="text-xs text-zinc-800">{name || "Unkown"}</label>
			{children}
		</div>
	);
};

type FlexProps = {
	children: React.ReactNode | React.ReactNode[];
};

export const Flex: FC<FlexProps> = ({ children }) => {
	return <div className="flex h-max w-full gap-4">{children}</div>;
};
