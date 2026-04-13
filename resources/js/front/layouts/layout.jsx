import { Head } from "@inertiajs/react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ title, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head title={title}/>
      <Header/>
      <main className="grow ">{children}</main>
      <Footer />
    </div>
  );
}
