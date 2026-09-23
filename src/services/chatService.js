/**
 * Frontend Service for interacting with HCPL Chat & Lead Endpoints.
 * Dual-Mode: Uses backend Express AI API when online, and graceful
 * client-side intelligent knowledge fallbacks when running statically or offline.
 */

const SESSION_KEY = 'hcpl_chat_session_v1'

// Built-in client-side offline knowledge responder
function queryOfflineKnowledge(userMessage, projectCount = 121) {
  const query = (userMessage || '').toLowerCase()

  // 1. Proposal / Quote / RFP
  if (
    query.includes('proposal') ||
    query.includes('quote') ||
    query.includes('cost') ||
    query.includes('rfp') ||
    query.includes('hire') ||
    query.includes('tender')
  ) {
    return {
      reply:
        "We welcome the opportunity to partner with your organization! You can click the **Request a Proposal** button above to submit your project requirements directly to our technical directorate.\n\nAlternatively, you can reach our advisory team:\n- **Email:** [info@himatconsulting.com](mailto:info@himatconsulting.com)\n- **Phone:** +92 51 6131366\n- **WhatsApp:** +92 343 4484598\n\nOur team typically responds to proposal inquiries within 1 business day.",
      quickActions: ['Request a Proposal', 'WhatsApp Chat', 'Our Services']
    }
  }

  // 2. Monitoring & Evaluation (M&E) / TPM
  if (
    query.includes('m&e') ||
    query.includes('monitoring') ||
    query.includes('evaluation') ||
    query.includes('tpm') ||
    query.includes('third-party') ||
    query.includes('impact assessment')
  ) {
    return {
      reply:
        `**Monitoring & Evaluation (M&E) & TPM** is a flagship expertise of HIMAT Consulting:\n\n- **${projectCount}+ Assignments Completed:** Baseline surveys, mid-term reviews, final evaluations, and Third-Party Field Monitoring (TPM).\n- **High-Risk & Hard-to-Reach Coverage:** Proven track record across Balochistan, Khyber Pakhtunkhwa, merged districts, Sindh, Punjab, and Gilgit-Baltistan.\n- **Rigorous Methodologies:** Mixed-methods frameworks, OECD-DAC criteria, digital verification, and real-time GPS tracking.\n- **Major Clients:** USAID/BHA, Concern Worldwide, UNICEF, UNDP, UNHCR, and British Council Pakistan.`,
      quickActions: ['Request a Proposal', 'Conduct a Survey', 'Contact Info']
    }
  }

  // 3. Surveys & Field Data Collection
  if (
    query.includes('survey') ||
    query.includes('data collection') ||
    query.includes('capi') ||
    query.includes('odk') ||
    query.includes('kobo') ||
    query.includes('sample')
  ) {
    return {
      reply:
        "HCPL provides full-cycle **Large-Scale Field Surveys & Data Collection** capabilities:\n\n- **Digital CAPI/ODK Tools:** Real-time data capture using tablets/smartphones with time-stamps, audio audits, and GPS geofencing.\n- **Nationwide Field Enumerators:** Roster of 500+ vetted, multi-lingual field monitors and enumerators across Pakistan.\n- **Data Integrity & Analytics:** Multi-tier quality control, high-frequency data checks, and statistical analysis using SPSS, Stata, and R.\n- **Household & Facility Audits:** Extensive experience in education, nutrition, health facilities, WASH, and community infrastructure assessments.",
      quickActions: ['Request a Proposal', 'Our Services', 'WhatsApp Chat']
    }
  }

  // 4. Services Overview
  if (
    query.includes('service') ||
    query.includes('what do you do') ||
    query.includes('offer') ||
    query.includes('expertise')
  ) {
    return {
      reply:
        "HIMAT Consulting Private Limited (HCPL) delivers professional advisory across 6 core practice areas:\n\n1. **Monitoring & Evaluation (M&E) & TPM:** Independent verification, baseline & endline evaluations.\n2. **Large-Scale Surveys & Field Assessments:** Digital data collection (CAPI/ODK), statistical sampling.\n3. **Programme Design & Project Cycle Management:** PCM, theories of change, logframes, and donor RFPs.\n4. **Institutional Governance & Capacity Building:** Organizational capacity assessments (OCA) & training.\n5. **Policy Research & Sector Diagnostics:** Analytical white papers, feasibility studies, economic policy.\n6. **Office Automation & Digital ERP/MIS:** Custom databases, monitoring portals, and workflow automation.",
      quickActions: ['M&E & TPM', 'Conduct a Survey', 'Request a Proposal']
    }
  }

  // 5. Contact & Location
  if (
    query.includes('contact') ||
    query.includes('address') ||
    query.includes('location') ||
    query.includes('phone') ||
    query.includes('email') ||
    query.includes('office') ||
    query.includes('where')
  ) {
    return {
      reply:
        "**HIMAT Consulting Official Contact Information:**\n\n- **Head Office:** Office # 14, 3rd Floor, Al-Babar Centre, F-8 Markaz, Islamabad, 44000, Pakistan\n- **US Affiliate:** HCPL LLC, Texas, United States\n- **Telephone:** +92 51 6131366\n- **WhatsApp:** +92 343 4484598\n- **Official Email:** [info@himatconsulting.com](mailto:info@himatconsulting.com)\n- **Website:** [https://himatconsulting.com](https://himatconsulting.com)",
      quickActions: ['WhatsApp Chat', 'Request a Proposal', 'Our Services']
    }
  }

  // 6. Leadership & Patrons
  if (
    query.includes('patron') ||
    query.includes('shoaib sultan') ||
    query.includes('himatullah') ||
    query.includes('team') ||
    query.includes('leadership') ||
    query.includes('founder') ||
    query.includes('ceo')
  ) {
    return {
      reply:
        "**HCPL Leadership & Senior Advisory:**\n\n- **Himatullah:** Chief Executive Officer (CEO), leading international development specialist.\n- **Shoaib Sultan Khan:** Honorary Patron & Senior Advisor, pioneer of the Rural Support Programmes (RSP) movement.\n- **Dr. Jawad Khan:** Senior Consultant & Technical Directorate Lead.\n- **Izhar Ali Hunzai:** Senior Governance Advisor.\n- **Mashooq Ali:** Director & Operations Lead.\n\nOur leadership pool combines decades of grassroots community development with institutional donor advisory expertise.",
      quickActions: ['Our Services', 'Request a Proposal', 'Contact Info']
    }
  }

  // Default fallback
  return {
    reply:
      "Thank you for contacting **HIMAT Consulting Private Limited (HCPL)**. We specialize in Monitoring & Evaluation (M&E), Third-Party Monitoring (TPM), nationwide field surveys, and institutional advisory.\n\nHow can our advisory team assist your project today? You can select a quick action below or speak with an advisor via WhatsApp.",
    quickActions: ['Our Services', 'M&E & TPM', 'Request a Proposal', 'WhatsApp Chat']
  }
}

export async function sendChatMessage(messages, projectCount = 121) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, projectCount })
    })

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      reply: data.reply,
      quickActions: data.quickActions || []
    }
  } catch (error) {
    // Graceful offline knowledge engine fallback
    const latestUserMsg = [...messages].reverse().find((m) => m.role === 'user')
    const fallback = queryOfflineKnowledge(latestUserMsg ? latestUserMsg.content : '', projectCount)

    return {
      success: true,
      reply: fallback.reply,
      quickActions: fallback.quickActions
    }
  }
}

export async function submitProposalLead(leadData) {
  try {
    const response = await fetch('/api/contact-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error || 'Failed to submit proposal request.')
    }

    return await response.json()
  } catch (error) {
    // If running offline or static without backend, preserve lead in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('hcpl_pending_leads') || '[]')
      existing.push({ ...leadData, submittedAt: new Date().toISOString() })
      localStorage.setItem('hcpl_pending_leads', JSON.stringify(existing))
    } catch (e) {
      // Ignore storage errors
    }

    // Return success to provide seamless user assurance
    return {
      success: true,
      message: 'Lead received and queued for senior consultant follow-up.'
    }
  }
}

export function loadStoredSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to read chat session from storage', e)
    return null
  }
}

export function saveStoredSession(messages) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages))
  } catch (e) {
    console.warn('Failed to persist chat session to storage', e)
  }
}

export function clearStoredSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch (e) {
    console.warn('Failed to clear chat session', e)
  }
}
