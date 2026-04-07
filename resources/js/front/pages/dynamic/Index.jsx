import PageCard from "../../components/dynamic/PageCard";
import Layout from "../../layouts/Layout";

export default function Index({pages}){
  return (
    <Layout title = "Dynamic Pages">
      {pages.map(page => {
        return (
          <PageCard page={page} onDelete={()=>{}} onEdit={()=>{}}></PageCard>
        );
      })}
    </Layout>
  );
}
