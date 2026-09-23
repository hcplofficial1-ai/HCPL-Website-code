import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ClientMarquee from '../components/common/ClientMarquee'
import { CLIENT_LOGOS } from '../data/clientLogos'

const LOGO_LOOKUP = CLIENT_LOGOS.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {})

const ALL_58_CLIENTS = [
  { id: 'acf', name: 'Action Against Hunger (ACF)', short: 'ACF', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['acf'] },
  { id: 'asi', name: 'Adam Smith International (ASI)', short: 'ASI', cat: 'bilateral', type: 'Bilateral / Advisory', ...LOGO_LOOKUP['asi'] },
  { id: 'akah', name: 'Aga Khan Agency for Habitat (AKAH)', short: 'AKAH', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['akah'] },
  { id: 'akf', name: 'Aga Khan Foundation (AKF)', short: 'AKF', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['akf'] },
  { id: 'akfp', name: 'Aga Khan Foundation Pakistan (AKFP)', short: 'AKFP', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['akfp'] },
  { id: 'akft', name: 'Aga Khan Foundation Tajikistan (AKFT)', short: 'AKFT', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['akft'] },
  { id: 'akcpk', name: 'Aga Khan National Council Pakistan (AKCSP/AKCPK)', short: 'AKCSP', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['akcpk'] },
  { id: 'akrsp', name: 'Aga Khan Rural Support Programme (AKRSP)', short: 'AKRSP', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['akrsp'] },
  { id: 'adb', name: 'Asian Development Bank (ADB)', short: 'ADB', cat: 'multilateral', type: 'Multilateral', ...LOGO_LOOKUP['adb'] },
  { id: 'bettercotton', name: 'Better Cotton', short: 'BCI', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['bettercotton'] },
  { id: 'britishcouncil', name: 'British Council', short: 'BC', cat: 'bilateral', type: 'Bilateral', ...LOGO_LOOKUP['britishcouncil'] },
  { id: 'care', name: 'CARE International in Pakistan (CIP)', short: 'CARE', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['care'] },
  { id: 'cabi', name: 'Centre for Agriculture and Biosciences International (CABI)', short: 'CABI', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['cabi'] },
  { id: 'cgn', name: 'Children Global Network (CGN)', short: 'CGN', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['cgn'] },
  { id: 'cbm', name: 'Christoffel-Blindenmission/CBM Germany', short: 'CBM', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['cbm'] },
  { id: 'concern', name: 'Concern Worldwide', short: 'Concern', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['concern'] },
  { id: 'cesvi', name: 'Cooperazione e Sviluppo (CESVI)', short: 'CESVI', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['cesvi'] },
  { id: 'doaba', name: 'Doaba Foundation', short: 'Doaba', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['doaba'] },
  { id: 'eu', name: 'European Union (EU)', short: 'EU', cat: 'multilateral', type: 'Multilateral', ...LOGO_LOOKUP['eu'] },
  { id: 'fdo', name: 'Farmer Development Organisation (FDO)', short: 'FDO', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['fdo'] },
  { id: 'giz', name: 'Gesellschaft für Internationale Zusammenarbeit (GIZ)', short: 'GIZ', cat: 'bilateral', type: 'Bilateral', ...LOGO_LOOKUP['giz'] },
  { id: 'grc', name: 'German Red Cross (GRC)', short: 'GRC', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['grc'] },
  { id: 'gbrsp', name: 'Gilgit-Baltistan Rural Support Programme (GBRSP)', short: 'GBRSP', cat: 'gov', type: 'Government / Provincial', ...LOGO_LOOKUP['gbrsp'] },
  { id: 'gain', name: 'Global Alliance for Improved Nutrition (GAIN)', short: 'GAIN', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['gain'] },
  { id: 'gosindh', name: 'Government of Sindh', short: 'GoS', cat: 'gov', type: 'Government', ...LOGO_LOOKUP['gosindh'] },
  { id: 'gdp', name: 'Group Development Pakistan', short: 'GDP', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['gdp'] },
  { id: 'bhc', name: 'British High Commission', short: 'BHC', cat: 'bilateral', type: 'Bilateral', ...LOGO_LOOKUP['bhc'] },
  { id: 'helpage', name: 'HelpAge International', short: 'HelpAge', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['helpage'] },
  { id: 'ifad', name: 'International Fund for Agricultural Development/Economic Transformation Initiative (IFAD/ETI)', short: 'IFAD', cat: 'un', type: 'UN Agency', ...LOGO_LOOKUP['ifad'] },
  { id: 'irsp', name: 'Integrated Regional Support Program (IRSP)', short: 'IRSP', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['irsp'] },
  { id: 'irc', name: 'International Rescue Committee (IRC)', short: 'IRC', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['irc'] },
  { id: 'itc', name: 'International Trade Centre (ITC)', short: 'ITC', cat: 'un', type: 'UN Agency', ...LOGO_LOOKUP['itc'] },
  { id: 'jpal', name: 'J-PAL Poverty Action Lab', short: 'J-PAL', cat: 'multilateral', type: 'Research / Global', ...LOGO_LOOKUP['jpal'] },
  { id: 'lpp', name: 'Lodhran Pilot Project (LPP)', short: 'LPP', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['lpp'] },
  { id: 'msi', name: 'Management Systems International (MSI)', short: 'MSI', cat: 'multilateral', type: 'Multilateral', ...LOGO_LOOKUP['msi'] },
  { id: 'nida', name: 'NIDA Pakistan', short: 'NIDA', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['nida'] },
  { id: 'nca', name: 'Norwegian Church Aid (NCA)', short: 'NCA', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['nca'] },
  { id: 'ni', name: 'Nutrition International (NI)', short: 'NI', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['ni'] },
  { id: 'oxfam', name: 'Oxford Committee for Famine Relief (OXFAM)', short: 'OXFAM', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['oxfam'] },
  { id: 'ppaf', name: 'Pakistan Poverty Alleviation Fund (PPAF)', short: 'PPAF', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['ppaf'] },
  { id: 'pspa', name: 'Punjab Social Protection Authority', short: 'PSPA', cat: 'gov', type: 'Government', ...LOGO_LOOKUP['pspa'] },
  { id: 'rdf', name: 'Research and Development Foundation (RDF)', short: 'RDF', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['rdf'] },
  { id: 'rspn', name: 'Rural Support Program Network (RSPN)', short: 'RSPN', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['rspn'] },
  { id: 'savethechildren', name: 'Save the Children', short: 'SaveChildren', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['savethechildren'] },
  { id: 'sightsavers', name: 'Sightsavers UK', short: 'Sightsavers', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['sightsavers'] },
  { id: 'srso', name: 'Sindh Rural Support Organisation (SRSO)', short: 'SRSO', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['srso'] },
  { id: 'sdc', name: 'Swiss Agency for Development and Cooperation (SDC)', short: 'SDC', cat: 'bilateral', type: 'Bilateral', ...LOGO_LOOKUP['sdc'] },
  { id: 'trdp', name: 'Thardeep Rural Development Programme (TRDP)', short: 'TRDP', cat: 'ngo', type: 'National NGO', ...LOGO_LOOKUP['trdp'] },
  { id: 'unesco', name: 'UNESCO', short: 'UNESCO', cat: 'un', type: 'UN Agency', ...LOGO_LOOKUP['unesco'] },
  { id: 'unicef', name: 'UNICEF', short: 'UNICEF', cat: 'un', type: 'UN Agency', ...LOGO_LOOKUP['unicef'] },
  { id: 'sdgunit', name: 'UNICEF/SDG Unit, Ministry of Planning and Special Initiatives', short: 'SDG Unit', cat: 'gov', type: 'Government / UN', ...LOGO_LOOKUP['sdgunit'] },
  { id: 'usaid', name: 'United States Agency for International Development (USAID)', short: 'USAID', cat: 'bilateral', type: 'Bilateral', ...LOGO_LOOKUP['usaid'] },
  { id: 'ofda', name: 'U.S. Office of Foreign Disaster Assistance (OFDA)', short: 'OFDA', cat: 'bilateral', type: 'Bilateral', ...LOGO_LOOKUP['ofda'] },
  { id: 'wateraid', name: 'WaterAid', short: 'WaterAid', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['wateraid'] },
  { id: 'whh', name: 'Welthungerhilfe (WHH)', short: 'WHH', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['whh'] },
  { id: 'worldbank', name: 'World Bank', short: 'World Bank', cat: 'multilateral', type: 'Multilateral', ...LOGO_LOOKUP['worldbank'] },
  { id: 'wfp', name: 'World Food Programme (WFP)', short: 'WFP', cat: 'un', type: 'UN Agency', ...LOGO_LOOKUP['wfp'] },
  { id: 'wwf', name: 'World Wide Fund for Nature (WWF)', short: 'WWF', cat: 'ingo', type: 'INGO', ...LOGO_LOOKUP['wwf'] },
]

const GLOBAL_PARTNERS = [
  {
    name: 'Sard Organization for Society Support (SOSS)',
    fullName: 'Sard Organization for Society Support (SOSS)',
    region: 'Erbil, Iraq',
    logo: './logos/soss-logo.png',
    desc: 'Iraq-based civil society organization specializing in community stabilization, social support, and local humanitarian research.',
  },
  {
    name: 'Fieldwork & Research Indonesia (FRI)',
    fullName: 'Fieldwork & Research Indonesia (FRI)',
    region: 'Indonesia',
    logo: './logos/fri-logo.png',
    desc: 'Indonesian fieldwork and research firm conducting nationwide survey operations, data collection, and diagnostic assessments.',
  },
  {
    name: 'M-Vector Research & Consulting',
    fullName: 'M-Vector Research & Consulting',
    region: 'Tajikistan',
    logo: './logos/m-vector-logo.png',
    desc: 'Leading Central Asian market and social research advisory firm with regional offices across Bishkek, Tashkent, Dushanbe, Almaty, and Canada.',
  },
  {
    name: 'Kaizen Consulting',
    fullName: 'Kaizen Consulting',
    region: 'Saudi Arabia',
    logo: './logos/kaizen-logo.jpg',
    logoNote: 'Temporary placeholder; official logo not included in supplied profile',
    desc: 'Saudi Arabia-based management and operational consulting partner specializing in institutional capacity and performance optimization.',
  },
  {
    name: 'Omie Consultants',
    fullName: 'Omie Consultants',
    region: 'Papua New Guinea',
    logo: './logos/omie-placeholder.png',
    logoNote: 'Temporary placeholder; official logo not included in supplied files',
    desc: 'Papua New Guinea advisory partner conducting community evaluations, baseline research, and local stakeholder engagement across Northern Provinces.',
  },
  {
    name: 'Pacifika MEL & GEDSI Consultants',
    fullName: 'Pacifika MEL & GEDSI Consultants',
    region: 'Papua New Guinea',
    logo: './logos/pacifika-logo.jpg',
    desc: 'Pacific regional consulting firm specializing in Monitoring, Evaluation, Learning (MEL) and Gender Equality, Disability and Social Inclusion (GEDSI).',
  },
  {
    name: 'Fieldwork Africa',
    fullName: 'Fieldwork Africa',
    region: 'Ethiopia',
    logo: './logos/fieldwork-africa-logo.jpg',
    desc: 'Ethiopia and East Africa research partner providing large-scale quantitative and qualitative field survey logistics.',
  },
  {
    name: 'Nepal Development Research Institute (NDRI)',
    fullName: 'Nepal Development Research Institute (NDRI)',
    region: 'Nepal',
    logo: './logos/ndri-placeholder.png',
    logoNote: 'Temporary placeholder; official logo not included in supplied MoU',
    desc: 'Premier non-profit policy research institute in Nepal specializing in water resources, climate resilience, health, and economic studies.',
  },
  {
    name: 'Sustainable Environmental Solutions (Pvt.) Ltd. (SES)',
    fullName: 'Sustainable Environmental Solutions (Pvt.) Ltd. (SES)',
    region: 'Islamabad, Pakistan',
    logo: './logos/ses-logo.png',
    desc: 'Pakistan-based environmental engineering and sustainability advisory firm focusing on EIA, climate adaptation, and resource management.',
  },
  {
    name: 'SkillMax Consulting Company Limited (Inc.)',
    fullName: 'SkillMax Consulting Company Limited (Inc.)',
    region: 'Juba, South Sudan',
    logo: './logos/skillmax-logo.jpg',
    desc: 'South Sudan advisory firm delivering TVET strengthening, institutional capacity assessment, and workforce development research.',
  },
  {
    name: 'Kinconsult Associates Ltd',
    fullName: 'Kinconsult Associates Ltd',
    region: 'Nairobi, Kenya',
    logo: './logos/kinconsult-logo.jpg',
    desc: 'Kenya-based management consulting firm delivering strategic research, organizational development, and program evaluations in East Africa.',
  },
  {
    name: 'Oxford Policy Management (OPM)',
    fullName: 'Oxford Policy Management (OPM)',
    region: 'Oxford, United Kingdom; global office network',
    logo: './logos/opm-logo.jpg',
    desc: 'Global international development consultancy operating across 50+ countries to improve public policy and socio-economic outcomes.',
  },
  {
    name: 'Dynasty Evaluation Centre (DEC)',
    fullName: 'Dynasty Evaluation Centre (DEC) Uganda',
    region: 'Kampala, Uganda',
    logo: './logos/dec-placeholder.svg',
    logoNote: 'Temporary placeholder; official logo was not included in supplied profile',
    desc: 'Uganda-based research, evaluation, field data collection and independent verification partner.',
  },
  {
    name: 'GIS Plus',
    fullName: 'GIS Plus Total Solutions (Pvt.) Ltd.',
    region: 'Islamabad, Pakistan',
    logo: './logos/gis-plus-logo.png',
    desc: 'Geospatial technology partner specializing in GIS, remote sensing, spatial data infrastructure and GeoAI.',
  },
  {
    name: 'id:rc',
    fullName: 'Interdisciplinary Research Consultants (id:rc)',
    region: 'Amman, Jordan',
    logo: './logos/idrc-logo.png',
    desc: 'Jordan-based international consulting firm specializing in surveys, evaluations, socioeconomic studies and technical assistance.',
  },
  {
    name: 'Ipsos',
    fullName: 'Ipsos',
    region: 'Jordan and Iraq',
    logo: './logos/ipsos-logo.png',
    desc: 'Global market and social research partner with established operations in Jordan and Iraq.',
  },
  {
    name: 'Keystone Global Analytics',
    fullName: 'Keystone Global Analytics',
    region: 'Zimbabwe; Lusaka, Zambia & Lilongwe, Malawi',
    logo: './logos/keystone-global-analytics-logo.png',
    desc: 'Research, evaluation and advisory partner serving Zimbabwe and the wider Southern and East African regions.',
  },
  { name: 'NTU International', region: 'Europe', desc: 'International development consultancy specializing in institutional reform, governance, and complex multi-country evaluations.' },
  { name: 'DEVYIELD', region: 'Europe', desc: 'M&E and econometric impact evaluation firm delivering rigorous development intelligence for European development banks.' },
  { name: 'University of Central Asia', region: 'Central Asia', desc: 'Premier regional academic institution collaborating on applied socio-economic diagnostics and rural development.' },
  { name: 'SYNERGY Management Consultants', region: 'Afghanistan', desc: 'Regional advisory firm providing strategic governance, enterprise development, and humanitarian assessment expertise.' },
]

const TABS = ['All Partners', 'UN Agencies', 'Multilateral & Bilateral', 'INGOs', 'Government & Public', 'National NGOs']

const TAB_FILTER_MAP = {
  'All Partners': null,
  'UN Agencies': ['un'],
  'Multilateral & Bilateral': ['multilateral', 'bilateral'],
  'INGOs': ['ingo'],
  'Government & Public': ['gov'],
  'National NGOs': ['ngo'],
}

function ClientLogoCard({ client }) {
  const badgeColors = {
    un: { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd' },
    multilateral: { bg: '#f0e0fa', text: '#760CB0', border: '#e9d5ff' },
    bilateral: { bg: '#fef3c7', text: '#d97706', border: '#fde68a' },
    ingo: { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
    gov: { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' },
    ngo: { bg: '#f3e8ff', text: '#9333ea', border: '#d8b4fe' },
  }[client.cat] || { bg: '#f3e8ff', text: '#760CB0', border: '#e9d5ff' }

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid rgba(118,12,176,0.08)',
        padding: '1.75rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        minHeight: '160px',
        cursor: 'default',
        boxSizing: 'border-box',
      }}
      className="hagler-client-card"
    >
      {/* Visual Logo Graphic or Image */}
      <div
        style={{
          height: '75px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.15rem',
          maxWidth: '100%',
          width: '100%',
        }}
      >
        {client.img ? (
          <img
            src={client.img}
            alt={client.name}
            style={{
              maxHeight: '70px',
              maxWidth: '200px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              mixBlendMode: 'multiply',
            }}
          />
        ) : client.svg ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1.3)' }}>
            {client.svg}
          </div>
        ) : (
          <span style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#760CB0' }}>
            {client.short || client.name}
          </span>
        )}
      </div>

      {/* Client Full Name */}
      <h3
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontWeight: 700,
          fontSize: '0.92rem',
          color: '#212121',
          lineHeight: 1.35,
          margin: '0 0 0.5rem',
          maxWidth: '100%',
        }}
      >
        {client.name}
      </h3>

      {/* Category Tag */}
      <span
        style={{
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: badgeColors.text,
          background: badgeColors.bg,
          padding: '0.15rem 0.6rem',
          borderRadius: '999px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {client.type || client.tag || 'Partner'}
      </span>
    </div>
  )
}

export default function Clients() {
  const [activeTab, setActiveTab] = useState('All Partners')
  const [search, setSearch] = useState('')

  const filteredClients = useMemo(() => {
    return ALL_58_CLIENTS.filter((c) => {
      const allowedCategories = TAB_FILTER_MAP[activeTab]
      const matchCategory = !allowedCategories || allowedCategories.includes(c.cat)
      const matchSearch =
        !search.trim() ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.short.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase())

      return matchCategory && matchSearch
    })
  }, [activeTab, search])

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
          padding: '5rem 0 4rem',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: "'Inter', Arial, sans-serif",
              marginBottom: '1.5rem',
            }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
              Home
            </Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>Clients & Institutional Partners</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '999px',
              padding: '0.3rem 0.85rem',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              Institutional Portfolio
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Our Institutional Partners
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '650px',
              lineHeight: 1.75,
            }}
          >
            Trusted development advisory and third-party monitoring partner for 58+ multilateral
            organizations, UN agencies, bilateral donors, government ministries, and international NGOs.
          </p>
        </div>
      </section>

      {/* Continuous Animated Marquee */}
      <section style={{ padding: '2.5rem 0', background: '#faf5ff', borderBottom: '1px solid rgba(118,12,176,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span className="eyebrow" style={{ color: '#760CB0' }}>
            Trusted Worldwide
          </span>
          <h3
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#212121',
              margin: '0.2rem 0',
            }}
          >
            Global Development Organizations
          </h3>
        </div>
        <ClientMarquee />
      </section>

      {/* Global Strategic Partners Section */}
      <section style={{ background: '#ffffff', padding: '4.5rem 0 3.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow">Strategic Alliance</div>
            <h2
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: '2.25rem',
                fontWeight: 700,
                color: '#212121',
              }}
            >
              Global Strategic Partners
            </h2>
            <p
              style={{
                color: '#666',
                maxWidth: '560px',
                margin: '0.5rem auto 0',
                fontSize: '0.95rem',
                lineHeight: 1.7,
              }}
            >
              International firms and academic institutions with whom HIMAT maintains formal research,
              technical advisory, and multi-country operational partnerships.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {GLOBAL_PARTNERS.map((p) => (
              <div
                key={p.name}
                style={{
                  background: '#faf5ff',
                  borderRadius: '18px',
                  border: '1.5px solid rgba(118,12,176,0.12)',
                  padding: '1.5rem',
                  boxShadow: '0 4px 18px rgba(118,12,176,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Logo Frame: Equal-Size Container with White Background & object-fit: contain */}
                <div
                  style={{
                    width: '100%',
                    height: '75px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid rgba(118,12,176,0.1)',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  ) : (
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#760CB0' }}>{p.name}</span>
                  )}
                </div>

                {/* Location Badge */}
                <span
                  style={{
                    background: 'rgba(118,12,176,0.08)',
                    color: '#760CB0',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    fontFamily: "'Inter', Arial, sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    alignSelf: 'flex-start',
                  }}
                >
                  📍 {p.region}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: '#212121',
                      margin: '0 0 0.15rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {p.name}
                  </h3>
                  {p.fullName && p.fullName !== p.name && (
                    <div style={{ fontSize: '0.78rem', color: '#760CB0', fontWeight: 700 }}>
                      {p.fullName}
                    </div>
                  )}
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: '#555555',
                    lineHeight: 1.65,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {p.desc}
                </p>

                {p.logoNote && (
                  <div style={{ fontSize: '0.72rem', color: '#78716c', fontStyle: 'italic', background: '#fff', padding: '0.45rem 0.65rem', borderRadius: '6px', border: '1px dashed #d6d3d1' }}>
                    ℹ️ {p.logoNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL COUNTRIES & WORLDWIDE REACH (FEATURING THE PURPLE WORLD GLOBE) */}
      {/* GLOBAL COUNTRIES & WORLDWIDE REACH */}
      <section
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #faf5ff 50%, #ffffff 100%)',
          padding: '5rem 0 4.5rem',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(118,12,176,0.08)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow">Worldwide Footprint</div>
            <h2
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: '#212121',
                margin: '0.25rem 0 0.75rem',
              }}
            >
              Global Country Presence & Institutional Reach
            </h2>
            <p
              style={{
                color: '#666',
                maxWidth: '640px',
                margin: '0 auto',
                fontSize: '0.96rem',
                lineHeight: 1.75,
              }}
            >
              Executing multi-country development evaluations, baseline diagnostics, and third-party monitoring across high-impact international corridors.
            </p>
          </div>

          {/* Global Country Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              maxWidth: '1100px',
              margin: '0 auto',
            }}
          >
            {[
              { flag: '🇵🇰', country: 'Pakistan', city: 'Islamabad HQ', role: 'Nationwide Field Survey & Provincial Operations' },
              { flag: '🇺🇸', country: 'United States', city: 'Stafford, Texas', role: 'Global Executive Office & North America Advisory' },
              { flag: '🇹🇯', country: 'Tajikistan', city: 'Dushanbe & Pamir', role: 'Aga Khan Foundation Regional Evaluations' },
              { flag: '🇦🇫', country: 'Afghanistan', city: 'Cross-Border', role: 'Humanitarian Verification & KAP Studies' },
              { flag: '🇨🇭', country: 'Switzerland', city: 'Bern / Geneva', role: 'SDC Fiduciary & Development Governance' },
              { flag: '🇬🇧', country: 'United Kingdom', city: 'London / FCDO', role: 'British High Commission Program Audits' },
              { flag: '🇪🇺', country: 'European Union', city: 'Brussels Consortia', role: 'Multi-Country Socio-Economic Diagnostics' },
              { flag: '🌐', country: 'Central & South Asia', city: 'Regional Corridor', role: 'Transboundary Climate & Water Diagnostics' },
            ].map((c) => (
              <div
                key={c.country}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.4rem 1.25rem',
                  border: '1.5px solid rgba(118,12,176,0.12)',
                  boxShadow: '0 4px 18px rgba(118,12,176,0.05)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
                className="country-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '1.5rem' }}>{c.flag}</span>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      color: '#760CB0',
                      background: 'rgba(118,12,176,0.08)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {c.city}
                  </span>
                </div>
                <h4 style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '1.05rem', fontWeight: 800, color: '#212121', margin: '0.25rem 0 0' }}>
                  {c.country}
                </h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#666', lineHeight: 1.55, margin: 0 }}>
                  {c.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE 58 CLIENTS WALL (Hagler Bailly / McKinsey Style) */}
      <section
        style={{
          background: 'linear-gradient(180deg, #fbf7ff 0%, #ffffff 100%)',
          padding: '5rem 0 7rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '750px',
        }}
      >

        {/* Ambient Gradient in Bottom-Right Corner */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(118,12,176,0.07) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            <div className="eyebrow">Institutional Client Network</div>
            <h2
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: '#212121',
                marginBottom: '0.75rem',
              }}
            >
              All 58 Development Partners & Clients
            </h2>
            <p
              style={{
                color: '#666',
                maxWidth: '680px',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              Explore our complete institutional clientele spanning UN bodies, bilateral agencies,
              multilateral development banks, government authorities, and global civil society.
            </p>

            {/* Interactive Filter Pills & Search */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      padding: '0.5rem 1.15rem',
                      borderRadius: '999px',
                      border: '1.5px solid',
                      borderColor: isActive ? '#760CB0' : 'rgba(118,12,176,0.18)',
                      background: isActive ? '#760CB0' : '#ffffff',
                      color: isActive ? '#ffffff' : '#760CB0',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 4px 12px rgba(118,12,176,0.25)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>

            {/* Search Filter Box */}
            <div style={{ maxWidth: '400px', width: '100%', marginBottom: '2rem' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍  Search client or organization name..."
                style={{
                  width: '100%',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.88rem',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(118,12,176,0.2)',
                  outline: 'none',
                  background: '#ffffff',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* 58 Client Logos Grid (Without Numbers, Hagler Bailly Style) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredClients.map((client) => (
              <ClientLogoCard key={client.name} client={client} />
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px dashed rgba(118,12,176,0.2)',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
              <h3 style={{ fontFamily: "'Inter', Arial, sans-serif", color: '#760CB0', margin: 0 }}>
                No clients found matching "{search}"
              </h3>
              <button
                onClick={() => {
                  setSearch('')
                  setActiveTab('All Partners')
                }}
                style={{
                  marginTop: '1rem',
                  background: '#760CB0',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
          padding: '4rem 0',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: '2.25rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.75rem',
            }}
          >
            Partner With HIMAT Consulting
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '2rem',
              maxWidth: '520px',
              margin: '0 auto 2rem',
              fontSize: '0.95rem',
            }}
          >
            Join 58+ leading development agencies relying on HIMAT for rigorous, context-driven evaluation
            and diagnostic intelligence.
          </p>
          <Link
            to="/contact"
            style={{
              background: '#fff',
              color: '#760CB0',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 700,
              padding: '0.85rem 2.25rem',
              borderRadius: '10px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            Work With Us →
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes globeFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-12px) rotate(4deg); }
        }
        .hagler-client-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(118,12,176,0.12) !important;
          border-color: #760CB0 !important;
        }
        @media (max-width: 768px) {
          .corner-globe-left {
            width: 220px !important;
            height: 220px !important;
            opacity: 0.4 !important;
          }
        }
      `}</style>
    </div>
  )
}
