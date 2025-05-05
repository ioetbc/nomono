import { useEffect, useRef, useState } from "react";

interface Option {
	id: string;
	label: string;
}

interface MultiSelectProps {
	options: Option[];
	placeholder?: string;
	onChange: (selectedOptions: Option[]) => void;
	initialSelectedOptions?: Option[];
	className?: string;
}

export function MultiSelect({
	options,
	placeholder = "Select options...",
	onChange,
	initialSelectedOptions = [],
	className = "",
}: MultiSelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedOptions, setSelectedOptions] = useState<Option[]>(
		initialSelectedOptions,
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Filter options based on search term
	const filteredOptions = options.filter(
		(option) =>
			!selectedOptions.some((selected) => selected.id === option.id) &&
			option.label.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// Handle selection change
	const handleSelect = (option: Option) => {
		const newSelectedOptions = [...selectedOptions, option];
		setSelectedOptions(newSelectedOptions);
		onChange(newSelectedOptions);
		setSearchTerm("");
		inputRef.current?.focus();
	};

	// Handle removal of selected option
	const handleRemove = (optionId: string) => {
		const newSelectedOptions = selectedOptions.filter(
			(option) => option.id !== optionId,
		);
		setSelectedOptions(newSelectedOptions);
		onChange(newSelectedOptions);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={`relative ${className}`}>
			{selectedOptions.length > 0 && (
				<div className="mb-2 flex flex-wrap gap-4">
					{selectedOptions.map((option) => (
						<div
							key={option.id}
							className="filter filter-primary flex gap-1 items-center"
						>
							<button type="button" className="btn">
								{option.label}
							</button>
							<button
								type="button"
								className="btn"
								onClick={() => handleRemove(option.id)}
							>
								✕
							</button>
						</div>
					))}
				</div>
			)}

			<div className="relative" ref={dropdownRef}>
				<input
					ref={inputRef}
					type="text"
					className="input input-bordered w-full"
					placeholder={placeholder}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onFocus={() => setIsOpen(true)}
				/>
				{isOpen && (
					<div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto border border-gray-200">
						<ul className="py-1">
							{filteredOptions.length > 0 ? (
								filteredOptions.map((option) => (
									<li
										key={option.id}
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
										onClick={() => handleSelect(option)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleSelect(option);
											}
										}}
									>
										{option.label}
									</li>
								))
							) : (
								<li className="px-4 py-2 text-gray-500">No options found</li>
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
