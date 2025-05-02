type Props =
	| {
			label: string;
			handler: VoidFunction;
			button_type: "button";
	  }
	| {
			label: string;
			button_type: "submit";
	  };

export const Button = (props: Props) => {
	return (
		<button
			onClick={props.button_type === "button" ? props.handler : undefined}
			type={props.button_type}
			className="p-2 rounded-md border border-gray-300 text-gray-600 font-medium cursor-pointer"
		>
			{props.label}
		</button>
	);
};
