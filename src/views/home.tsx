import About from "../components/about";
import Contact from "../components/contact";
import { Courses } from "../components/course";
import Footer from "../components/footer";
import { Hero } from "../components/hero";
import { Navbar } from "../components/navbar";
import { News } from "../components/news";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <News />
      <Courses />
      <About />
      <Contact />
      <Footer/>
    </div>
  )
}
