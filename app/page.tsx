import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import Grid from "@/components/Grid";
import Photogallery from "@/components/Photogallery";
import Cinema from "@/components/Cinema";
import Videogallery from "@/components/Videogallery";
// import Reels from "@/components/reels";
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
      {/* <Reels /> */}
      <Footer />
    </main>
  );
}
