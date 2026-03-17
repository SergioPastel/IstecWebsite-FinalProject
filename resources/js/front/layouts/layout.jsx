import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <hr />
      <main className="flex-grow pt-20 px-6">{children}</main>
      <hr />
      <Footer />
    </div>
  );
}
