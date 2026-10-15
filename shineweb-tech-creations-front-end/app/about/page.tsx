
import AboutHero from "@/components/pages/about/AboutHero/AboutHero";
import OurStory from "@/components/pages/about/OurStory/OurStory";
import MissionVision from "@/components/pages/about/MissionVision/MissionVision";
import AboutServices from "@/components/pages/about/AboutServices/AboutServices";
import OurValues from "@/components/pages/about/OurValues/OurValues";
import AboutCTA from "@/components/pages/about/AboutCTA/AboutCTA";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
       <OurStory />
      <MissionVision />
      <AboutServices />
      <OurValues />
      <AboutCTA /> 
    </main>
  );
}
