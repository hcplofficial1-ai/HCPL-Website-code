import { useData } from '../context/DataContext'
import ClientMarquee from '../components/common/ClientMarquee'
import BainHero from '../components/home/BainHero'
import AnimatedStatsStrip from '../components/home/AnimatedStatsStrip'
import CoreCompetenciesSection from '../components/home/CoreCompetenciesSection'
import VisionMissionMotto from '../components/home/VisionMissionMotto'
import PortfolioCapabilities from '../components/home/PortfolioCapabilities'
import ClientTestimonialsSection from '../components/home/ClientTestimonialsSection'
import BainCaseStudies from '../components/home/BainCaseStudies'
import BainInsights from '../components/home/BainInsights'
import MeetOurPeopleSection from '../components/home/MeetOurPeopleSection'

export default function Home() {
  const { stats } = useData()

  return (
    <div>
      {/* 1. CINEMATIC HERO SECTION */}
      <BainHero />

      {/* 2. ANIMATED STATS STRIP */}
      <AnimatedStatsStrip />

      {/* 3. CLIENT LOGO MARQUEE */}
      <section style={{ background: '#ffffff', padding: '4rem 0 2rem' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="eyebrow">TRUSTED BY MULTILATERAL AGENCIES & BILATERAL DONORS</div>
        </div>
        <ClientMarquee />
      </section>

      {/* 4. VISION, MISSION & MOTTO WITH TOP-TO-BOTTOM STAGGERED ANIMATION */}
      <VisionMissionMotto />

      {/* 5. CORE COMPETENCIES (05 CORE COMPETENCIES - 9 DOMAINS) */}
      <CoreCompetenciesSection />

      {/* 6. PORTFOLIO & 16 THEMATIC AREAS (06 & 07 PORTFOLIO & THEMATIC DOMAINS) */}
      <PortfolioCapabilities videoSrc="/DSC_0013.MOV" />

      {/* 7. OFFICIAL CLIENT TESTIMONIALS (13 CLIENT TESTIMONIALS) */}
      <ClientTestimonialsSection />

      {/* 8. FEATURED CASE STUDIES & CLIENT RESULTS */}
      <BainCaseStudies />

      {/* 9. MEET OUR PEOPLE / TEAM SECTION */}
      <MeetOurPeopleSection videoSrc="/our-people.mp4" />

      {/* 10. EXECUTIVE INSIGHTS & BRIEFINGS */}
      <BainInsights />
    </div>
  )
}
