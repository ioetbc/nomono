import { Link } from "react-router";

type Props = {
	title: string;
	description: string;
	to: string;
	emoji?: string;
};

export default function Card({ title, description, to, emoji }: Props) {
	const colors = {
		border: "border-indigo-200",
		titleColor: "text-indigo-900",
		descColor: "text-indigo-700",
	};

	return (
		<Link
			to={to}
			className={`group block p-8 border ${colors.border} rounded-xl shadow-sm transition-hover duration-200 hover:shadow-md`}
		>
			{emoji && (
				<div className="mb-4 flex items-center">
					<span className="text-5xl mr-3">{emoji}</span>
				</div>
			)}
			<h5
				className={`mb-3 text-xl font-bold tracking-tight ${colors.titleColor}`}
			>
				{title}
			</h5>
			<div className="flex flex-col gap-4">
				<p className={`${colors.descColor}`}>{description}</p>
				<div className="flex gap-2 items-center text-sm font-medium">
					<span>Get started</span>
					<span className="transform transition-transform group-hover:translate-x-1">
						→
					</span>
				</div>
			</div>
		</Link>
	);
}
