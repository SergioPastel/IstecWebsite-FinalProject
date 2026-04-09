import BlockResolver from "./BlockResolver";

export default function TextSection({ blocks }) {
  console.log(blocks);
  return (
    <section className="container mx-auto py-12">
      {blocks.map((block, index) => (
        <BlockResolver key={index} block={block} />
      ))}
    </section>
  );
}
