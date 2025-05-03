import Card from "../components/card";

export default function Home() {
	const cards = [
		{
			title: "Scrape events",
			description:
				"Run the web scraper to collect new events from gallery websites and social media.",
			to: "/scrape",
			emoji: "🔍",
			color: "green",
		},
		{
			title: "Manage events",
			description:
				"Create and update exhibition events. Schedule and organize gallery showings.",
			to: "/exhibitions",
			emoji: "🎭",
			color: "purple",
		},
		{
			title: "Manage artists",
			description:
				"Create and update artists in the database. Add new profiles and edit existing information.",
			to: "/artists",
			emoji: "👩‍🎨",
			color: "indigo",
		},
		{
			title: "Manage galleries",
			description:
				"Create and update galleries. Maintain gallery details and contact information.",
			to: "/galleries",
			emoji: "🏛️",
			color: "blue",
		},
	];

	return (
		<div className="w-full">
			<div className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
				<div className="mb-12 ">
					<h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
						no___notes
					</h1>
					<p className="max-w-2xl text-xl text-gray-500">
						Manage gallery content, artists and exhibitions
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{cards.map((card) => (
						<Card
							key={card.to}
							title={card.title}
							description={card.description}
							to={card.to}
							emoji={card.emoji}
							color={card.color}
						/>
					))}
				</div>
			</div>
			<div className="mt-16 border-t border-gray-200 pt-8 text-center">
				<p className="text-sm text-gray-500">
					© {new Date().getFullYear()} no___notes Admin System • All rights
					reserved
				</p>
			</div>
		</div>
	);
}
