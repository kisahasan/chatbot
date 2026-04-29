interface Props {
  model: string;
  setModel: (model: string) => void;
}

const models = [
  { value: "llama-3.1-8b-instant", label: "Fast (8B)" },
  { value: "llama-3.1-70b-versatile", label: "Smart (70B)" },
];

export default function ModelSelector({ model, setModel }: Props) {
  return (
    <select
      value={model}
      onChange={(e) => setModel(e.target.value)}
      className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-sm"
    >
      {models.map((m) => (
        <option key={m.value} value={m.value}>
          {m.label}
        </option>
      ))}
    </select>
  );
}