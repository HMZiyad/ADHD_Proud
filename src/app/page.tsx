import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Features from "./components/Features";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <ProductList />
      <Features />
      <About />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
