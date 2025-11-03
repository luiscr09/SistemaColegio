import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { News } from "@/components/news"
import { Courses } from "@/components/courses"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <News />
      <Courses />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
