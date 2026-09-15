// Helper utility to match any project client name with its verified logo
export function getClientLogo(clientName = '') {
  if (!clientName) {
    return { src: null, initials: 'HC', name: 'Client' }
  }

  const c = clientName.toLowerCase()

  // 1. UN Agencies
  if (c.includes('unicef')) return { src: './logos/unicef.png', name: 'UNICEF' }
  if (c.includes('world food programme') || c.includes('wfp')) return { src: './logos/wfp.jpg', name: 'WFP' }
  if (c.includes('unesco')) return { src: './logos/unesco.jpg', name: 'UNESCO' }
  if (c.includes('ifad')) return { src: './logos/ifad.jpg', name: 'IFAD' }

  // 2. Multilateral & Bilateral Donors
  if (c.includes('world bank') || c.includes('j-pal')) return { src: './logos/worldbank.png', name: 'World Bank' }
  if (c.includes('usaid') || c.includes('ofda') || c.includes('msi')) return { src: './logos/usaid.png', name: 'USAID' }
  if (c.includes('european union') || c.includes('eu')) return { src: './logos/eu.png', name: 'European Union' }
  if (c.includes('giz')) return { src: './logos/giz.png', name: 'GIZ' }
  if (c.includes('asian development bank') || c.includes('adb')) return { src: './logos/adb.jpg', name: 'ADB' }
  if (c.includes('sdc') || c.includes('swiss')) return { src: './logos/sdc.jpg', name: 'SDC' }
  if (c.includes('itc') || c.includes('trade centre')) return { src: './logos/itc.jpg', name: 'ITC' }

  // 3. British / UK Institutions
  if (c.includes('british council') || c.includes('cgn')) return { src: './logos/britishcouncil.png', name: 'British Council' }
  if (c.includes('british high commission') || c.includes('bhc')) return { src: './logos/bhc.jpg', name: 'British High Commission' }
  if (c.includes('adam smith') || c.includes('asi')) return { src: './logos/asi.jpg', name: 'Adam Smith International' }

  // 4. International NGOs (INGOs)
  if (c.includes('aga khan foundation') || c.includes('akah') || c.includes('akfp') || c.includes('akft') || c.includes('akcpk') || c.includes('akf')) return { src: './logos/akf.jpg', name: 'Aga Khan Foundation' }
  if (c.includes('aga khan rural support') || c.includes('akrsp')) return { src: './logos/akrsp.jpg', name: 'AKRSP' }
  if (c.includes('action against hunger') || c.includes('acf')) return { src: './logos/acf.png', name: 'Action Against Hunger' }
  if (c.includes('better cotton')) return { src: './logos/bettercotton.jpg', name: 'Better Cotton' }
  if (c.includes('care')) return { src: './logos/care.jpg', name: 'CARE International' }
  if (c.includes('cesvi')) return { src: './logos/cesvi.jpg', name: 'CESVI' }
  if (c.includes('concern')) return { src: './logos/concern.jpg', name: 'Concern Worldwide' }
  if (c.includes('cbm') || c.includes('blindenmission') || c.includes('doaba')) return { src: './logos/cbm.jpg', name: 'CBM' }
  if (c.includes('german red cross') || c.includes('grc')) return { src: './logos/grc.jpg', name: 'German Red Cross' }
  if (c.includes('helpage')) return { src: './logos/helpage.jpg', name: 'HelpAge International' }
  if (c.includes('irc') || c.includes('rescue committee')) return { src: './logos/irc.jpg', name: 'IRC' }
  if (c.includes('norwegian church') || c.includes('nca')) return { src: './logos/nca.jpg', name: 'Norwegian Church Aid' }
  if (c.includes('wwf') || c.includes('nature')) return { src: './logos/wwf.png', name: 'WWF' }
  if (c.includes('cabi') || c.includes('bioscience')) return { src: './logos/cabi.svg', name: 'CABI' }
  if (c.includes('sightsavers')) return { src: './logos/sightsavers.jpg', name: 'Sightsavers' }

  // 5. National NGOs & Government
  if (c.includes('ppaf') || c.includes('poverty alleviation')) return { src: './logos/ppaf.jpg', name: 'PPAF' }
  if (c.includes('pspa') || c.includes('social protection authority')) return { src: './logos/pspa.jpg', name: 'PSPA' }
  if (c.includes('rdf') || c.includes('research and development foundation')) return { src: './logos/rdf.jpg', name: 'RDF' }
  if (c.includes('rspn') || c.includes('rural support programmes network')) return { src: './logos/rspn.jpg', name: 'RSPN' }
  if (c.includes('trdp') || c.includes('thardeep')) return { src: './logos/trdp.jpg', name: 'TRDP' }
  if (c.includes('gbrsp')) return { src: './logos/gbrsp.jpg', name: 'GBRSP' }
  if (c.includes('irsp') || c.includes('integrated regional')) return { src: './logos/irsp.jpg', name: 'IRSP' }
  if (c.includes('lpp') || c.includes('lodhran')) return { src: './logos/lpp.jpg', name: 'LPP' }
  if (c.includes('nida')) return { src: './logos/nida.jpg', name: 'NIDA Pakistan' }
  if (c.includes('navttc') || c.includes('national vocational')) return { src: './logos/gop.jpg', name: 'NAVTTC' }
  if (c.includes('micromerger')) return { src: './logos/pspa.jpg', name: 'MicroMerger' }
  if (c.includes('sjda') || c.includes('silver jubilee')) return { src: './logos/akf.jpg', name: 'SJDA' }
  if (c.includes('planning commission') || c.includes('sdg') || c.includes('sindh') || c.includes('punjab') || c.includes('government') || c.includes('ministry')) return { src: './logos/gop.jpg', name: 'Government of Pakistan' }

  // Generic Clean Monogram Fallback
  const initials = clientName
    .split(/[\s/()]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join('')

  return {
    src: null,
    initials: initials || 'HC',
    name: clientName,
  }
}
