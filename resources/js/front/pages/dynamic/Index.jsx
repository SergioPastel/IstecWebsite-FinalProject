import PageCard from "../../components/dynamic/PageCard";
import CardGrid from "../../components/dynamic/CardGrid";
import Layout from "../../layouts/Layout";

export default function Index({ pages }) {
  const cards = pages.map((page) => ({
    title: page.title,
    href: route("dynamic.show", { slug: page.slug }),
    linkText: page.slug, // Usually better to show the title or "View Page" here
    description:
      `${page.sections.length} sections: ` +
      page.sections.map((section) => section.type).join(", "),
  }));

  return (
    <Layout title="Dynamic Pages">
            <CardGrid title={'Pages'} items={cards} />
    </Layout>
  );
}
