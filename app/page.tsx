import AboutPage from "./components/home/about"; 
import CaseStudies from "./components/home/case-studies";
import Contact from "./components/home/contact";
import HeroSection from "./components/home/hero-section";

 

export default function HomePage() {
  return (
    <>
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">   
        <AboutPage />
      </section>

      <section id="case-studies">
        <CaseStudies />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}