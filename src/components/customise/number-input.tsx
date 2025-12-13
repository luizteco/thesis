interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function NumberInput({ value, onChange }: NumberInputProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-purple-500 hover:text-white text-gray-700 font-bold rounded-lg transition-colors border border-gray-200"
        type="button"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 h-10 px-4 text-center font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
      />
      <button
        onClick={() => onChange(value + 1)}
        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-purple-500 hover:text-white text-gray-700 font-bold rounded-lg transition-colors border border-gray-200"
        type="button"
      >
        +
      </button>
    </div>
  );
}
