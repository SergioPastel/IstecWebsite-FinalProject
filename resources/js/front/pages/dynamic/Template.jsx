import Layout from "../../layouts/Layout";
import SectionResolver from "../../components/dynamic/SectionResolver";

export default function Template({ page }) {
  return (
    <Layout title={page.title}>
      <div className="mt-10">
        {page.sections.map((section) => {
          return <SectionResolver key={section.id} section={section} />;
        })}
      </div>
    </Layout>
  );
}
