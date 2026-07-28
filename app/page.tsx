import Navbar from "@/components/a_Navbar";
import Hero from "@/components/b_Hero";
import Countdown from "@/components/c_Countdown";
import Trailer from "@/components/d_Trailer";
import Frammenti from "@/components/e_Frammenti";
import Program from "@/components/f_Program";
import Location from "@/components/g_Location";
import Travel from "@/components/h_Travel";
import FAQ from "@/components/i_FAQ";
import RSVP from "@/components/l_RSVP";
import Donazione from "@/components/m_ListaNozze";
import Footer from "@/components/n_Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Countdown />
        <Trailer />
        <Frammenti />
        <Program />
        <Location />
        <Travel />
        <Donazione />
        <FAQ />
        <RSVP />
      </main>

      <Footer />
    </>
  );
}