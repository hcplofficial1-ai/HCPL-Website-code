/**
 * Chat Assistant configuration constants, branding, and contact channels.
 */

export const CHAT_CONFIG = {
  assistantName: 'HCPL AI Assistant',
  assistantRole: 'Official AI Advisor for HIMAT Consulting',
  welcomeMessage:
    'Hello! Welcome to **HIMAT Consulting Private Limited (HCPL)**. How can I assist you with our research, monitoring & evaluation (M&E), large-scale surveys, or project advisory services today?',

  contact: {
    email: 'info@himatconsulting.com',
    phone: '+92 51 6131366',
    whatsappNumber: '923434484598',
    whatsappDisplay: '+92 343 4484598',
    address: 'Office # 14, 3rd Floor, Al-Babar Centre, F-8 Markaz, Islamabad, Pakistan',
    website: 'https://himatconsulting.com'
  },

  initialQuickActions: [
    { label: 'Our Services', prompt: 'What core consulting and research services does HCPL offer?' },
    { label: 'M&E & TPM', prompt: "Tell me about HCPL's Monitoring & Evaluation (M&E) and Third-Party Monitoring experience." },
    { label: 'Conduct a Survey', prompt: 'How does HCPL conduct nationwide surveys and digital field data collection?' },
    { label: 'Request a Proposal', action: 'open_proposal_modal' },
    { label: 'WhatsApp Chat', action: 'open_whatsapp' },
    { label: 'Contact Info', prompt: 'Where is HCPL located and how can I reach the team?' }
  ]
}
