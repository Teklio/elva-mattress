import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <div className="bg-[#F8F9FA] border-b border-slate-100">
        <CategoriesSection isHomePage={true} />
      </div>
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
