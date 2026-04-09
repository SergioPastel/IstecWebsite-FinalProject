import Card from "./Card";
import CardGrid from "./CardGrid";
import HeroSwiper from "./HeroSwiper";
import TextSection from "./TextSection/TextSection";

/**
 * Import usable components at the top.
 * Add entries here
 *
 */
const componentMap = {
  // section.type: imported component
  hero: HeroSwiper,
  card: Card,
  card_grid: CardGrid,
  text: TextSection
};

/**
 *  This function is responsible for finding the appropriate components for rendering the sections in
 *  the dynamic pages.
 *  Admins will select from a list of component types, ex: Hero sections, Text sections, etc. and this
 *  will render the component type specified as section.type.
 *
 *  It may be possible to also "chain call" this method, if the first returned component has additional
 *  options. Not tested
 *
 *  ### Section content:
 *  section = {
 *    type: ...,
 *    content: {
 *      (content should correspond to matching type)
 *    }
 *  }
 */
export default function ComponentResolver({ section }) {
  const Component = componentMap[section.type];

  if (!Component) {
    return <div> Unknown section {section.type} </div>;
  }

  return <Component {...section.content} />;
}
