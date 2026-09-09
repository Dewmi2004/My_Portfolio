import { useTheme } from "./hooks/useTheme";
import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import EducationCerts from "./components/EducationCerts";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import BackgroundFx from "./components/BackgroundFx";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  useLenis();

  return (
    <>
      <CustomCursor />
      <BackgroundFx />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <EducationCerts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
