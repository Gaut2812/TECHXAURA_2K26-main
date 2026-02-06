import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { EventsShowcase } from "@/components/landing/EventsShowcase";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <About />
      <EventsShowcase />
      <Footer />
    </main>
  );
}
