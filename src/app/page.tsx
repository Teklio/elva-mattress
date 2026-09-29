import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";
import Footer from "@/components/footer";
import { getStoryblokTestimonials, getStoryblokBlogs, getStoryblokProducts } from "@/lib/storyblok";

export default async function Home() {
  const storyblokTestimonials = await getStoryblokTestimonials();
  const storyblokBlogs = await getStoryblokBlogs();
  const storyblokProducts = await getStoryblokProducts();

  return (
    <>
      <Hero />
      <About />
      <div className="bg-[#F8F9FA] border-b border-slate-100">
        <CategoriesSection isHomePage={true} initialProducts={storyblokProducts} />
      </div>
      <Testimonials initialTestimonials={storyblokTestimonials} />
      <BlogSection initialBlogs={storyblokBlogs} />
      <Contact />
      <Footer />
    </>
  );
}
