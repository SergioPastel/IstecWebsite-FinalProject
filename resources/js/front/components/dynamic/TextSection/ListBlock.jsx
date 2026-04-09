export default function ListBlock({ items }) {
  return (
    <ul className="list-disc ml-6 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
