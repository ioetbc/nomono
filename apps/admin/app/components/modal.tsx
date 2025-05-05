import { type DialogHTMLAttributes, type FC, forwardRef } from "react";

type Props = DialogHTMLAttributes<HTMLDialogElement>;

export const Modal = forwardRef<HTMLDialogElement, Props>(
	({ children }, ref) => {
		return (
			<dialog ref={ref} className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add a new artist</h3>
					<p className="py-4">
						Use the form below to add a new artist to the database. Note that
						all data on the page will be lost.
					</p>

					<div className="modal-action flex-col gap-2">{children}</div>
				</div>
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
		<section className="w-full flex justify-center gap-2">{children}</section>
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
