import HeroSwiper from "./HeroSwiper";

/**
 * Import usable components at the top.
 * Add entries here
 *
 */
const componentMap = {
  // section.type: imported component
  hero: HeroSwiper,
};

/**
 *  This function is responsible for finding the appropriate components for rendering the sections in
 *  the dynamic pages.
 *  Admins will select from a list of component types, ex: Hero sections, Text sections, etc. and this
 *  will render the component type specified as section.type.
 *
 *  ### Section content:
 *  section = {
 *    type: ...,
 *    content: {
 *      (content should correspond to matching type)
 *    }
 *  }
 */
export default function SectionResolver({ section }) {
  const Component = componentMap[section.type];

  if (!Component) {
    return <div> Unknown section {section.type} </div>;
  }

  return <Component {...section.content} />;
}
