interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function NumberInput({ value, onChange }: NumberInputProps) {
  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 px-2 border border-gray-700"
      />
    </div>
  );
}
