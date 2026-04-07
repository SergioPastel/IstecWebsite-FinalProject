import Layout from "../../layouts/Layout";
import ComponentResolver from "../../components/dynamic/SectionResolver";

export default function Template({ page }) {
  return (
    <Layout title={page.title}>
      <div className="mt-10">
        {page.sections.map((section) => {
          return <ComponentResolver key={section.id} section={section} />;
        })}
      </div>
    </Layout>
  );
}
