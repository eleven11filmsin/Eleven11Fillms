import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import Grid from "@/components/Grid";
import Photogallery from "@/components/Photogallery";
import Cinema from "@/components/Cinema";
import Videogallery from "@/components/Videogallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main>
      <Hero />
      <Banner />
      <Grid />
      <Photogallery />
      <Cinema />
      <Videogallery />
      <Testimonials />
      <Footer />
    </main>
  );
}
