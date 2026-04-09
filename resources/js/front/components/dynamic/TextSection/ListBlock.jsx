export default function ListBlock({ items }) {
  return (
    <ul className="list-disc ml-6 space-y-2 my-5">
      {items.map((item, i) => (
        <li key={i} className="text-justify">{item}</li>
      ))}
    </ul>
  );
}
