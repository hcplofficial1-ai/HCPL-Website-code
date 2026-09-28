import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function TermsOfUse() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      id: 'sec-1',
      num: '1',
      title: 'About HCPL',
      content: (
        <>
          <p>
            HIMAT Consulting Private Limited is a development consulting, research and advisory firm registered in Pakistan.
          </p>
          <p>
            HCPL provides services including research, monitoring and evaluation, impact assessments, third-party monitoring, surveys, policy analysis, institutional assessments, technical assistance, capacity development and advisory services across multiple development sectors.
          </p>
          <p>
            HCPL works with governments, international development organizations, UN agencies, donors, NGOs, civil society organizations, private-sector entities and other development partners.
          </p>
          <p>
            Nothing contained on this Website constitutes an offer to undertake any particular assignment or creates a contractual, advisory, fiduciary or professional relationship between HCPL and a Website user.
          </p>
        </>
      ),
    },
    {
      id: 'sec-2',
      num: '2',
      title: 'Intellectual Property Rights',
      content: (
        <>
          <p>
            Unless otherwise indicated, all materials appearing on this Website are owned by, licensed to, commissioned by, or lawfully used by HCPL.
          </p>
          <p>These materials may include:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Text and written content;</li>
            <li>Research summaries and publications;</li>
            <li>Reports and assessments;</li>
            <li>Methodologies and analytical frameworks;</li>
            <li>Survey approaches and research instruments;</li>
            <li>Databases and data visualizations;</li>
            <li>Graphics, illustrations and infographics;</li>
            <li>Photographs and videos;</li>
            <li>Logos, branding and design elements;</li>
            <li>Case studies and project descriptions;</li>
            <li>Presentations and downloadable materials;</li>
            <li>Website design, layout and functionality;</li>
            <li>Software, code and digital tools; and</li>
            <li>Other intellectual or proprietary materials.</li>
          </ul>
          <p>
            Such materials are protected, where applicable, by copyright, trademark, intellectual property and other applicable laws.
          </p>
          <p>
            All rights not expressly granted under these Terms are reserved by HCPL or the relevant rights holder.
          </p>
        </>
      ),
    },
    {
      id: 'sec-3',
      num: '3',
      title: 'Permitted Use of Website Content',
      content: (
        <>
          <p>
            HCPL grants Website users a limited, revocable, non-exclusive and non-transferable right to access and use publicly available Website content for legitimate personal, academic, informational or internal professional purposes.
          </p>
          <p>Users may download or print reasonable portions of publicly available Website materials provided that:</p>
          <ol style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>The material is not altered in a misleading manner;</li>
            <li>HCPL is properly acknowledged as the source where appropriate;</li>
            <li>Copyright, ownership and attribution notices are retained;</li>
            <li>The material is not commercially exploited without permission; and</li>
            <li>Its use does not falsely imply endorsement, partnership or approval by HCPL.</li>
          </ol>
          <p>
            Permission may be required for reproduction of substantial portions of HCPL reports, methodologies, proprietary tools, graphics, databases or other protected content.
          </p>
          <p>
            Requests for permission may be submitted to HCPL using the contact details provided below.
          </p>
        </>
      ),
    },
    {
      id: 'sec-4',
      num: '4',
      title: 'Prohibited Use',
      content: (
        <>
          <p>
            Users may not use this Website in a manner that is unlawful, fraudulent, abusive, harmful or inconsistent with these Terms.
          </p>
          <p>Without HCPL's prior written authorization, users must not:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Reproduce substantial portions of HCPL proprietary content;</li>
            <li>Republish HCPL content as their own;</li>
            <li>Modify HCPL materials in a manner that misrepresents their original meaning;</li>
            <li>Sell, license or commercially exploit HCPL Website content;</li>
            <li>Impersonate HCPL, its employees, consultants or partners;</li>
            <li>Falsely represent an association, partnership or endorsement by HCPL;</li>
            <li>Interfere with the operation or security of the Website;</li>
            <li>Attempt unauthorized access to any Website system, server, database or user account;</li>
            <li>Introduce viruses, malware or other harmful code;</li>
            <li>Bypass technological or access-control measures;</li>
            <li>Collect personal information about Website users without authorization;</li>
            <li>Use the Website for fraudulent procurement, recruitment, payment or contracting activities;</li>
            <li>Use HCPL branding for deceptive, defamatory or unlawful purposes; or</li>
            <li>Engage in any activity that infringes the rights of HCPL or another person or organization.</li>
          </ul>
          <p>
            HCPL reserves the right to restrict, suspend or terminate access where misuse is suspected.
          </p>
        </>
      ),
    },
    {
      id: 'sec-5',
      num: '5',
      title: 'Automated Access, Scraping and Artificial Intelligence',
      content: (
        <>
          <p>
            Except where expressly permitted by HCPL in writing, automated systems may not systematically scrape, crawl, harvest, download, reproduce or extract substantial Website content.
          </p>
          <p>HCPL Website content, proprietary methodologies, reports, databases or other protected materials may not be used without authorization to:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Train artificial intelligence or machine-learning models;</li>
            <li>Fine-tune generative AI systems;</li>
            <li>Build commercial datasets;</li>
            <li>Populate retrieval-augmented generation databases;</li>
            <li>Develop competing proprietary products or services; or</li>
            <li>Systematically reproduce HCPL knowledge products.</li>
          </ul>
          <p>
            This provision does not restrict lawful indexing by legitimate public search engines operating in accordance with generally accepted web standards.
          </p>
        </>
      ),
    },
    {
      id: 'sec-6',
      num: '6',
      title: 'Trademarks and Branding',
      content: (
        <>
          <p>
            The names HIMAT Consulting, HIMAT Consulting Private Limited, HCPL, associated logos, slogans, branding elements and visual identities displayed on the Website may constitute trademarks, trade names or proprietary brand assets of HCPL.
          </p>
          <p>They may not be reproduced or used in connection with any product, service, advertisement, publication, tender, proposal or organization without prior authorization where such use could:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Create confusion regarding ownership;</li>
            <li>Imply HCPL endorsement;</li>
            <li>Misrepresent a relationship with HCPL; or</li>
            <li>Damage HCPL's reputation or intellectual property rights.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'sec-7',
      num: '7',
      title: 'Research, Reports and Professional Information',
      content: (
        <>
          <p>
            HCPL publishes research findings, assessments, evaluations, policy analysis, technical materials, articles and other professional content for informational purposes.
          </p>
          <p>Although HCPL applies professional quality assurance standards to its work, Website content may:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Summarize more detailed research;</li>
            <li>Reflect conditions prevailing when a study was conducted;</li>
            <li>Depend upon data obtained from clients, stakeholders or third parties;</li>
            <li>Contain assumptions, methodological limitations or contextual qualifications; or</li>
            <li>Become outdated as circumstances change.</li>
          </ul>
          <div style={{ background: '#faf5ff', border: '1px solid rgba(118,12,176,0.18)', borderRadius: '10px', padding: '1rem 1.25rem', margin: '1rem 0' }}>
            <strong style={{ color: '#760CB0' }}>HCPL Quality Policy:</strong> Emphasizes evidence-based methods, systematic processes, client and stakeholder focus, professional accountability and continuous improvement.
          </div>
          <p>
            Users should therefore review the original publication, methodology and relevant context before relying upon a Website summary.
          </p>
        </>
      ),
    },
    {
      id: 'sec-8',
      num: '8',
      title: 'No Professional Advice',
      content: (
        <>
          <p>
            Website content is provided primarily for general information.
          </p>
          <p>Unless HCPL has entered into a written professional services agreement with you, information appearing on the Website does not constitute:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Legal advice;</li>
            <li>Financial advice;</li>
            <li>Tax or accounting advice;</li>
            <li>Investment advice;</li>
            <li>Medical advice;</li>
            <li>Engineering advice;</li>
            <li>Regulatory advice; or</li>
            <li>Assignment-specific consulting advice.</li>
          </ul>
          <p>
            Professional recommendations provided by HCPL to clients are developed under separately agreed contractual arrangements and based upon the circumstances, data and scope applicable to that assignment.
          </p>
          <p>
            Reliance on general Website content is therefore at the user's discretion.
          </p>
        </>
      ),
    },
    {
      id: 'sec-9',
      num: '9',
      title: 'Accuracy and Availability',
      content: (
        <>
          <p>
            HCPL seeks to maintain accurate and useful information on its Website.
          </p>
          <p>However, HCPL does not guarantee that every page, publication, project description, statistic, employment opportunity, procurement notice or external link will always be:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Complete;</li>
            <li>Error-free;</li>
            <li>Current;</li>
            <li>Continuously available; or</li>
            <li>Suitable for a user's particular purpose.</li>
          </ul>
          <p>
            HCPL may modify, update, withdraw or correct Website content at any time.
          </p>
        </>
      ),
    },
    {
      id: 'sec-10',
      num: '10',
      title: 'User Submissions and Contact Forms',
      content: (
        <>
          <p>
            Users may submit information to HCPL through inquiry forms, recruitment applications, partnership forms, contact forms, email links or other Website features.
          </p>
          <p>
            Users are responsible for ensuring that information submitted is accurate and lawful.
          </p>
          <p>Users must not submit material that:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Violates applicable law;</li>
            <li>Infringes intellectual property rights;</li>
            <li>Contains malware or malicious code;</li>
            <li>Is threatening, discriminatory, defamatory or abusive;</li>
            <li>Contains fraudulent or intentionally misleading information;</li>
            <li>Unlawfully discloses confidential or personal information belonging to another person; or</li>
            <li>Facilitates corruption, exploitation, harassment or other prohibited conduct.</li>
          </ul>
          <p>
            Submission of information through the Website does not obligate HCPL to enter into any business, employment, partnership or contractual relationship.
          </p>
        </>
      ),
    },
    {
      id: 'sec-11',
      num: '11',
      title: 'Privacy and Personal Data',
      content: (
        <>
          <p>
            HCPL is committed to responsible and ethical data management.
          </p>
          <div style={{ background: '#faf5ff', border: '1px solid rgba(118,12,176,0.18)', borderRadius: '10px', padding: '1rem 1.25rem', margin: '1rem 0' }}>
            <strong style={{ color: '#760CB0' }}>Data Governance and Protection Policy:</strong> Requires personal information to be handled in accordance with principles including accountability, transparency, integrity, security, compliance and ethical use.
          </div>
          <p>Where personal information is collected through the Website, HCPL will seek to ensure that it is:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Collected for legitimate purposes;</li>
            <li>Limited to information reasonably required;</li>
            <li>Handled securely;</li>
            <li>Accessed only by authorized persons;</li>
            <li>Shared only where appropriate and lawful;</li>
            <li>Retained only for necessary operational, legal or contractual purposes; and</li>
            <li>Securely disposed of when no longer required.</li>
          </ul>
          <p>
            HCPL's internal policy also requires consent where necessary, secure storage, controlled access and appropriate arrangements when information is shared with third parties.
          </p>
          <p>
            Further information is set out in HCPL's separate Privacy Policy. Where there is any inconsistency between these Terms and HCPL's Privacy Policy regarding personal-data processing, the Privacy Policy will govern that processing.
          </p>
        </>
      ),
    },
    {
      id: 'sec-12',
      num: '12',
      title: 'Confidential Information',
      content: (
        <>
          <p>
            Users should not transmit highly sensitive, confidential, privileged or classified information through ordinary Website contact forms unless expressly requested and appropriate safeguards have been established.
          </p>
          <p>
            Information submitted in relation to potential assignments, recruitment, partnerships or professional engagements may be reviewed by relevant HCPL personnel for legitimate business purposes.
          </p>
          <p>
            HCPL will apply reasonable confidentiality and information-security measures consistent with its internal policies and applicable contractual or legal obligations.
          </p>
        </>
      ),
    },
    {
      id: 'sec-13',
      num: '13',
      title: 'Safeguarding and Respectful Conduct',
      content: (
        <>
          <p>
            HCPL is committed to maintaining safe and respectful interactions with employees, consultants, partners, research participants, communities and other stakeholders.
          </p>
          <div style={{ background: '#faf5ff', border: '1px solid rgba(118,12,176,0.18)', borderRadius: '10px', padding: '1rem 1.25rem', margin: '1rem 0' }}>
            <strong style={{ color: '#760CB0' }}>Safeguarding Policy:</strong> Applies a zero-tolerance approach to abuse, exploitation and harassment and incorporates confidentiality, non-discrimination, dignity and Do No Harm principles.
          </div>
          <p>Users must not use HCPL's Website, communication systems or digital platforms to:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Harass, threaten or intimidate another person;</li>
            <li>Sexually exploit or abuse another person;</li>
            <li>Target children or adults at risk;</li>
            <li>Distribute exploitative or abusive material;</li>
            <li>Engage in discriminatory conduct;</li>
            <li>Unlawfully disclose another person's identity or personal data; or</li>
            <li>Retaliate against anyone raising a safeguarding concern.</li>
          </ul>
          <p>
            HCPL may report serious suspected misconduct to competent authorities where appropriate and legally required.
          </p>
        </>
      ),
    },
    {
      id: 'sec-14',
      num: '14',
      title: 'Fraud, Corruption and Misrepresentation',
      content: (
        <>
          <p>
            HCPL maintains a zero-tolerance approach to fraud and corruption. Its institutional policy requires employees, contractors, consultants and partners to prevent, mitigate and report fraudulent or corrupt conduct.
          </p>
          <p>The Website must therefore not be used to facilitate:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Fraud, bribery, kickbacks, corruption, collusion or coercion;</li>
            <li>Money laundering or financing of terrorism;</li>
            <li>Falsification of documents;</li>
            <li>Fraudulent recruitment;</li>
            <li>Fraudulent tenders or procurement;</li>
            <li>False claims of representation; or</li>
            <li>Other unlawful financial or commercial activity.</li>
          </ul>
          <p>
            HCPL reserves the right to investigate suspicious activity and cooperate with competent authorities, clients or development partners where legally appropriate.
          </p>
        </>
      ),
    },
    {
      id: 'sec-15',
      num: '15',
      title: 'Recruitment Fraud',
      content: (
        <>
          <p>
            HCPL may advertise vacancies, consulting opportunities or requests for CVs through its Website or official communication channels.
          </p>
          <p>
            Applicants should exercise caution regarding fraudulent communications pretending to originate from HCPL.
          </p>
          <p>
            Unless specifically and lawfully stated in an official process, HCPL does not authorize unrelated third parties to collect payments in exchange for guaranteed employment, consultant selection or recruitment.
          </p>
          <p>
            Use of HCPL's name or branding for fraudulent recruitment activity is strictly prohibited.
          </p>
        </>
      ),
    },
    {
      id: 'sec-16',
      num: '16',
      title: 'Procurement and Business Opportunities',
      content: (
        <>
          <p>
            Information regarding tenders, expressions of interest, partnership opportunities, supplier registration or procurement may occasionally appear on the Website.
          </p>
          <p>
            Publication of such information does not create any entitlement to an award, contract, shortlisting or partnership.
          </p>
          <p>
            All procurement processes remain subject to the applicable solicitation documents, eligibility criteria, evaluation procedures and contractual terms.
          </p>
          <p>
            Where a solicitation document differs from information summarized on the Website, the official solicitation document will prevail.
          </p>
        </>
      ),
    },
    {
      id: 'sec-17',
      num: '17',
      title: 'Third-Party Websites',
      content: (
        <>
          <p>
            HCPL's Website may contain links to websites, publications, databases or platforms operated by third parties. Such links may be provided for information or convenience.
          </p>
          <p>HCPL does not control third-party websites and is not responsible for their availability, security, content, privacy practices, accuracy, or terms of use.</p>
          <p>
            A link from HCPL's Website to another website does not necessarily constitute endorsement of that organization, product or service. Users access third-party websites at their own discretion and subject to those websites' respective terms and privacy policies.
          </p>
        </>
      ),
    },
    {
      id: 'sec-18',
      num: '18',
      title: 'External Publications and Third-Party Materials',
      content: (
        <>
          <p>
            Some Website content may incorporate information, photographs, datasets, logos, documents or materials owned by clients, donors, partners, governments or other third parties.
          </p>
          <p>
            Rights in those materials remain with their respective owners where applicable. Users are responsible for obtaining any permissions necessary before reproducing third-party materials.
          </p>
        </>
      ),
    },
    {
      id: 'sec-19',
      num: '19',
      title: 'Website Security',
      content: (
        <>
          <p>Users must not attempt to:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Gain unauthorized access to the Website;</li>
            <li>Probe or test Website vulnerabilities without authorization;</li>
            <li>Defeat authentication or security mechanisms;</li>
            <li>Interfere with servers or networks;</li>
            <li>Conduct denial-of-service attacks;</li>
            <li>Introduce malicious software; or</li>
            <li>Obtain information using deceptive technical means.</li>
          </ul>
          <p>
            HCPL may monitor Website traffic and system activity for legitimate security, fraud-prevention and operational purposes in accordance with applicable law. HCPL's internal IT Security Policy provides for role-based access, device security, network safeguards and monitoring for security purposes.
          </p>
        </>
      ),
    },
    {
      id: 'sec-20',
      num: '20',
      title: 'Disclaimer of Warranties',
      content: (
        <>
          <p>
            To the fullest extent permitted under applicable law, the Website and its content are provided on an “as available” and “as is” basis.
          </p>
          <p>HCPL does not provide an unconditional warranty that:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>The Website will operate without interruption;</li>
            <li>All content will always be error-free;</li>
            <li>Every downloadable file will be free of technical defects; or</li>
            <li>Website information will meet every user's particular requirements.</li>
          </ul>
          <p>
            Nothing in these Terms excludes obligations or liabilities that cannot lawfully be excluded.
          </p>
        </>
      ),
    },
    {
      id: 'sec-21',
      num: '21',
      title: 'Limitation of Liability',
      content: (
        <>
          <p>
            To the maximum extent permitted by applicable law, HCPL, its directors, officers, employees, consultants, affiliates and representatives will not be liable for indirect, incidental, consequential or special loss arising solely from use of, or inability to use, the Website.
          </p>
          <p>
            This may include loss arising from reliance upon general Website information, interruption of Website services, third-party links or unauthorized activity beyond HCPL's reasonable control.
          </p>
          <p>
            Nothing in these Terms limits liability where such limitation is prohibited by applicable law.
          </p>
        </>
      ),
    },
    {
      id: 'sec-22',
      num: '22',
      title: 'Indemnification',
      content: (
        <>
          <p>
            To the extent permitted by law, a user who unlawfully misuses the Website or materially violates these Terms may be responsible for losses, liabilities, expenses or claims reasonably incurred by HCPL as a result of that misuse.
          </p>
          <p>
            This provision does not apply where prohibited by applicable law.
          </p>
        </>
      ),
    },
    {
      id: 'sec-23',
      num: '23',
      title: 'Suspension or Termination of Access',
      content: (
        <>
          <p>HCPL may suspend, restrict or terminate access to any part of the Website where it reasonably believes that:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>These Terms have been violated;</li>
            <li>Website security is threatened;</li>
            <li>Unlawful activity has occurred;</li>
            <li>HCPL's intellectual property rights are being infringed; or</li>
            <li>Suspension is necessary to protect HCPL, its users, clients, partners or systems.</li>
          </ul>
          <p>
            HCPL may also discontinue Website functionality or content without prior notice.
          </p>
        </>
      ),
    },
    {
      id: 'sec-24',
      num: '24',
      title: 'Reporting Intellectual Property Infringement',
      content: (
        <>
          <p>
            If you believe that content appearing on the HCPL Website infringes copyright, trademark or another intellectual property right, you may contact HCPL with:
          </p>
          <ol style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Identification of the protected material;</li>
            <li>Identification of the allegedly infringing content;</li>
            <li>Your contact information;</li>
            <li>An explanation of your rights or authority regarding the material; and</li>
            <li>Sufficient information for HCPL to assess the request.</li>
          </ol>
          <p>
            HCPL may remove or restrict disputed material where appropriate after reviewing the claim.
          </p>
        </>
      ),
    },
    {
      id: 'sec-25',
      num: '25',
      title: 'Reporting Misconduct or Concerns',
      content: (
        <>
          <p>Concerns involving suspected:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Fraud or corruption;</li>
            <li>Safeguarding violations;</li>
            <li>Harassment;</li>
            <li>Data misuse;</li>
            <li>Security incidents;</li>
            <li>Impersonation;</li>
            <li>Intellectual property infringement; or</li>
            <li>Other misconduct associated with the Website</li>
          </ul>
          <p>
            May be reported to HCPL through its official communication channels. HCPL's safeguarding procedures provide for confidential reporting, protection against retaliation and appropriate investigation mechanisms.
          </p>
        </>
      ),
    },
    {
      id: 'sec-26',
      num: '26',
      title: 'Governing Law',
      content: (
        <>
          <p>
            These Terms of Use shall be governed by and interpreted in accordance with the applicable laws of the Islamic Republic of Pakistan, without prejudice to any mandatory legal rights that may apply in another jurisdiction.
          </p>
        </>
      ),
    },
    {
      id: 'sec-27',
      num: '27',
      title: 'Jurisdiction and Disputes',
      content: (
        <>
          <p>
            Subject to any mandatory law or contractual dispute-resolution provision that may apply, disputes relating specifically to use of this Website shall fall within the jurisdiction of the competent courts of Islamabad, Pakistan.
          </p>
          <p>
            Where appropriate, HCPL and the user may attempt in good faith to resolve a dispute amicably before commencing formal proceedings.
          </p>
        </>
      ),
    },
    {
      id: 'sec-28',
      num: '28',
      title: 'Severability',
      content: (
        <>
          <p>
            If any provision of these Terms is found by a competent authority to be invalid, unlawful or unenforceable, that provision shall be interpreted or limited to the minimum extent necessary, while the remaining provisions will continue in effect.
          </p>
        </>
      ),
    },
    {
      id: 'sec-29',
      num: '29',
      title: 'No Waiver',
      content: (
        <>
          <p>
            Failure by HCPL to enforce any provision of these Terms on one occasion does not constitute a waiver of HCPL's right to enforce that or another provision in the future.
          </p>
        </>
      ),
    },
    {
      id: 'sec-30',
      num: '30',
      title: 'Changes to These Terms',
      content: (
        <>
          <p>HCPL may update these Terms to reflect:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Changes in law;</li>
            <li>Regulatory developments;</li>
            <li>New Website functionality;</li>
            <li>Changes in HCPL services;</li>
            <li>Cybersecurity requirements;</li>
            <li>Changes in data-protection practices; or</li>
            <li>Organizational policy updates.</li>
          </ul>
          <p>
            The latest version will be published on this page with the applicable revision date. Continued use of the Website after publication of updated Terms constitutes acceptance of the revised Terms to the extent permitted by law.
          </p>
        </>
      ),
    },
  ]

  return (
    <div className="no-reveal" style={{ background: '#ffffff', minHeight: '100vh', color: '#212121', fontFamily: "'Inter', Arial, sans-serif" }}>
      {/* 1. Hero Header */}
      <section
        className="no-reveal"
        style={{
          background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
          padding: '6.5rem 0 4rem',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '1.5rem',
              fontWeight: 500,
            }}
          >
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'underline' }}>
              Home
            </Link>
            <span>›</span>
            <span>Legal & Governance</span>
            <span>›</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>Terms of Use</span>
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '999px',
              padding: '0.35rem 1rem',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              Institutional Governance & Legal Standards
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            TERMS OF USE
          </h1>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.92)',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}
          >
            HIMAT Consulting Private Limited (HCPL)
          </div>

          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.12)',
              padding: '0.25rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Last Updated: 28 September 2026
          </div>
        </div>
      </section>

      {/* 2. Preamble Banner */}
      <section className="no-reveal" style={{ background: '#faf5ff', borderBottom: '1px solid rgba(118,12,176,0.12)', padding: '2.5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1.5px solid rgba(118,12,176,0.18)',
              padding: '2rem 2.25rem',
              boxShadow: '0 10px 30px rgba(118,12,176,0.06)',
              lineHeight: '1.75',
              fontSize: '1rem',
              color: '#333333',
            }}
          >
            <p style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 600, color: '#111111' }}>
              Welcome to the website of HIMAT Consulting Private Limited (“HCPL”, “HIMAT Consulting”, “we”, “our”, or “us”).
            </p>
            <p style={{ margin: '0 0 1rem' }}>
              These Terms of Use govern access to and use of HCPL’s website, webpages, publications, reports, articles, downloadable resources, forms, databases, digital tools and other online content or services that link to these Terms (collectively, the “Website”).
            </p>
            <p style={{ margin: '0 0 1rem' }}>
              By accessing, browsing, downloading materials from, submitting information through, or otherwise using this Website, you acknowledge that you have read, understood and agreed to these Terms of Use. If you do not agree with these Terms, you should discontinue use of the Website.
            </p>
            <p style={{ margin: 0, color: '#666666', fontSize: '0.92rem' }}>
              HCPL may revise these Terms periodically. Any revised version will become effective when published on the Website, unless otherwise stated.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Legal Content (30 Sections) */}
      <section className="no-reveal" style={{ padding: '3.5rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '980px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {sections.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="no-reveal"
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(118,12,176,0.12)',
                  padding: '2.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  opacity: 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(118,12,176,0.1)', paddingBottom: '0.85rem' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#111111',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </h2>
                </div>

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.96rem',
                    lineHeight: '1.8',
                    color: '#424242',
                  }}
                >
                  {s.content}
                </div>
              </article>
            ))}
          </div>

          {/* Contact Box */}
          <div
            style={{
              marginTop: '3.5rem',
              background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
              borderRadius: '16px',
              border: '1.5px solid rgba(118,12,176,0.25)',
              padding: '2.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.8125rem', color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Legal & Compliance Inquiries
            </div>
            <h3
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#111111',
                margin: '0 0 0.85rem',
              }}
            >
              Questions Regarding These Terms?
            </h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 1.75rem', color: '#555555', fontSize: '0.95rem', lineHeight: 1.65 }}>
              For inquiries regarding permissions, intellectual property, data protection, or reporting concerns, please contact HCPL's administrative and legal directorate.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:info@himatconsulting.com"
                style={{
                  background: '#760CB0',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '0.75rem 1.65rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(118,12,176,0.3)',
                }}
              >
                ✉ Email Legal Directorate
              </a>
              <Link
                to="/contact"
                style={{
                  background: '#ffffff',
                  color: '#760CB0',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '0.75rem 1.65rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(118,12,176,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Official Contact Form →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
