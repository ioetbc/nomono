import { useState } from "react";
import { MultiSelect } from "./multi-select";

// Example data
const artistOptions = [
  { id: "1", label: "Picasso" },
  { id: "2", label: "Van Gogh" },
  { id: "3", label: "Monet" },
  { id: "4", label: "Da Vinci" },
  { id: "5", label: "Rembrandt" },
  { id: "6", label: "Michelangelo" },
  { id: "7", label: "Warhol" },
  { id: "8", label: "Dali" },
  { id: "9", label: "Kahlo" },
  { id: "10", label: "O'Keeffe" },
];

export function MultiSelectExample() {
  const [selectedArtists, setSelectedArtists] = useState<{ id: string; label: string }[]>([]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Select Artists</h2>
      
      <MultiSelect
        options={artistOptions}
        placeholder="Search artists..."
        onChange={setSelectedArtists}
        className="w-full"
      />
      
      <div className="mt-4">
        <h3 className="font-semibold">Selected artists ({selectedArtists.length}):</h3>
        <pre className="bg-gray-100 p-2 rounded mt-2 text-sm">
          {JSON.stringify(selectedArtists, null, 2)}
        </pre>
      </div>
    </div>
  );
}