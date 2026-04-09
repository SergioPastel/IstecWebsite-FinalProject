import HeadingBlock from "./HeadingBlock";
import ParagraphBlock from "./ParagraphBlock";
import ListBlock from "./ListBlock";

const blockComponents = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  list: ListBlock,
};

export default function BlockResolver({ block }) {
  const Component = blockComponents[block.type];

  if (!Component) return null;

  return <Component {...block} />;
}
