import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import { DEFAULT_PROJECTS } from '../src/data/projects.js'
import { DEFAULT_TEAM } from '../src/data/team.js'
import { PUBLISHED_REPORTS } from '../src/data/reportsData.js'
import { DEFAULT_COMPETENCIES } from '../src/data/competenciesData.js'
import { CLIENT_CERTIFICATES } from '../src/data/certificatesData.js'
import { DEFAULT_CONSULTANTS } from '../src/data/consultantsData.js'
import { DEFAULT_SERVICES } from '../src/data/servicesData.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))

// STATIC UPLOADS DIRECTORY
const UPLOADS_DIR = path.join(__dirname, '../public/uploads')
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}
app.use('/uploads', express.static(UPLOADS_DIR))

// Helper to save Base64 files to disk (eliminates 16MB MongoDB BSON limit)
function saveBase64File(dataUrl, subfolder = 'reports', defaultName = 'doc') {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return dataUrl
  }
  try {
    const targetDir = path.join(UPLOADS_DIR, subfolder)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    const matches = dataUrl.match(/^data:([A-Za-z0-9-+/.]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) {
      return dataUrl
    }

    const mimeType = matches[1].toLowerCase()
    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, 'base64')

    let ext = '.bin'
    if (mimeType.includes('pdf')) ext = '.pdf'
    else if (mimeType.includes('wordprocessingml') || mimeType.includes('docx')) ext = '.docx'
    else if (mimeType.includes('msword') || mimeType.includes('doc')) ext = '.doc'
    else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg'
    else if (mimeType.includes('png')) ext = '.png'
    else if (mimeType.includes('webp')) ext = '.webp'

    const safeName = (defaultName || 'file').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 40)
    const fileName = `${safeName}_${Date.now()}${ext}`
    const filePath = path.join(targetDir, fileName)

    fs.writeFileSync(filePath, buffer)
    return `/uploads/${subfolder}/${fileName}`
  } catch (err) {
    console.error('Error saving Base64 file to disk:', err)
    return dataUrl
  }
}

// MONGODB ATLAS CONNECTION
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hcplofficial1_db_user:EulaTaXCA07QeJdz@cluster0.jvcfjru.mongodb.net/himat_db?retryWrites=true&w=majority&appName=Cluster0'

let dbConnectPromise = null
async function ensureDbConnected() {
  if (mongoose.connection.readyState === 1) return
  if (!dbConnectPromise) {
    dbConnectPromise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .then(async () => {
        console.log('✅ MongoDB Atlas Connected Successfully')
        dbConnectPromise = null
        await autoSeedIfEmpty()
      })
      .catch((err) => {
        dbConnectPromise = null
        console.error('❌ MongoDB Atlas Connection Error:', err.message)
      })
  }
  await dbConnectPromise
}

// Initial connection attempt
ensureDbConnected()

// Middleware to ensure DB connection before handling API requests
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    await ensureDbConnected()
  }
  next()
})

// MONGOOSE SCHEMAS & MODELS
const ProjectSchema = new mongoose.Schema({
  no: { type: String, required: true, unique: true },
  client: String,
  title: String,
  type: String,
  sector: String,
  year: String,
  status: String,
  description: String,
}, { timestamps: true })

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  role: String,
  dept: String,
  category: String,
  email: String,
  linkedin: String,
  image: String,
  education: String,
  experience: String,
  specialties: [String],
  initials: String,
  order: Number,
}, { timestamps: true })

const ReportSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  client: String,
  clientCategory: String,
  fundingPartner: String,
  authoringFirm: String,
  year: String,
  sector: String,
  secondarySector: String,
  type: String,
  coverage: String,
  pages: String,
  pdfUrl: String,
  coverImage: String,
  logo: String,
  secondaryLogo: String,
  findingsTitle: String,
  summary: String,
  keyFindings: [String],
  methodology: String,
  docType: String,
  docName: String,
}, { timestamps: true })

const CertificateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  client: String,
  clientCategory: String,
  category: String,
  date: String,
  verifiedRef: String,
  title: String,
  logo: String,
  secondaryLogo: String,
  scope: String,
  citation: String,
  signatory: String,
  downloadUrl: String,
}, { timestamps: true })

import nodemailer from 'nodemailer'

const CompetencySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: String,
  title: String,
  description: String,
  image: String,
  focalPoint: String,
  altText: String,
  order: Number,
  published: Boolean,
  detailUrl: String,
  expertise: [String],
}, { timestamps: true })

const ContactSubmissionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  org: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: { type: String, default: 'New' },
}, { timestamps: true })

const ConsultantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  role: String,
  org: String,
  specialties: [String],
  image: String,
  initials: String,
  experience: String,
  order: Number,
}, { timestamps: true })

const Project = mongoose.model('Project', ProjectSchema)
const TeamMember = mongoose.model('TeamMember', TeamSchema)
const Report = mongoose.model('Report', ReportSchema)
const Certificate = mongoose.model('Certificate', CertificateSchema)
const Competency = mongoose.model('Competency', CompetencySchema)
const ContactSubmission = mongoose.model('ContactSubmission', ContactSubmissionSchema)
const Consultant = mongoose.model('Consultant', ConsultantSchema)

const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  icon: String,
  title: String,
  category: String,
  desc: String,
  features: [String],
  image: String,
  focalPoint: String,
  order: Number,
}, { timestamps: true })
const Service = mongoose.model('Service', ServiceSchema)

// EMAIL TRANSPORTER CONFIGURATION
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587
const SMTP_USER = process.env.SMTP_USER || 'info@himatconsulting.com'
const SMTP_PASS = process.env.SMTP_PASS || ''

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER || 'info@himatconsulting.com',
      pass: process.env.SMTP_PASS || '',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
}

// AUTO SEED FUNCTION
async function autoSeedIfEmpty() {
  try {
    const projCount = await Project.countDocuments()
    if (projCount === 0 && DEFAULT_PROJECTS.length > 0) {
      await Project.insertMany(DEFAULT_PROJECTS)
      console.log(`🌱 Auto-seeded ${DEFAULT_PROJECTS.length} projects to MongoDB Atlas`)
    }

    const teamCount = await TeamMember.countDocuments()
    if (teamCount === 0 && DEFAULT_TEAM.length > 0) {
      await TeamMember.insertMany(DEFAULT_TEAM)
      console.log(`🌱 Auto-seeded ${DEFAULT_TEAM.length} team members to MongoDB Atlas`)
    }

    // Clean up any legacy dummy reports
    await Report.deleteMany({ id: { $in: ['rep-srso-cif-2024', 'rep-nutrition-survey-2023', 'rep-cpi-success-2021'] } })
    for (const r of PUBLISHED_REPORTS) {
      await Report.updateOne({ id: r.id }, { $set: r }, { upsert: true })
    }

    const certCount = await Certificate.countDocuments()
    if (certCount === 0 && CLIENT_CERTIFICATES.length > 0) {
      await Certificate.insertMany(CLIENT_CERTIFICATES)
      console.log(`🌱 Auto-seeded ${CLIENT_CERTIFICATES.length} certificates to MongoDB Atlas`)
    }

    const compCount = await Competency.countDocuments()
    if (compCount === 0 && DEFAULT_COMPETENCIES.length > 0) {
      await Competency.insertMany(DEFAULT_COMPETENCIES)
      console.log(`🌱 Auto-seeded ${DEFAULT_COMPETENCIES.length} competencies to MongoDB Atlas`)
    } else {
      await Competency.updateOne({ id: 'organizational-assessment' }, { $set: { image: './images/organizational-assessment-workshop.jpg', focalPoint: 'center 52%' } })
      await Competency.updateOne({ id: 'capacity-building' }, { $set: { image: './images/organizational-assessment-bg.jpg' } })
      await Competency.updateOne({ id: 'third-party-monitoring' }, { $set: { image: './images/office-automation-erp-bg.jpg' } })
      await Competency.updateOne({ id: 'office-automation-erp' }, { $set: { image: './images/office-automation-erp-work.jpg', focalPoint: 'center 45%' } })
      await Competency.updateOne({ id: 'inclusive-programming' }, { $set: { image: './images/inclusive-programming-bg.jpg', focalPoint: 'center 38%' } })
    }

    const consultantCount = await Consultant.countDocuments()
    if (consultantCount === 0 && DEFAULT_CONSULTANTS.length > 0) {
      await Consultant.insertMany(DEFAULT_CONSULTANTS)
      console.log(`🌱 Auto-seeded ${DEFAULT_CONSULTANTS.length} consultants to MongoDB Atlas`)
    } else {
      await Consultant.updateOne({ id: 'izhar-ali-hunzai' }, { $set: { order: 1 } })
    }

    const serviceCount = await Service.countDocuments()
    if (serviceCount === 0 && DEFAULT_SERVICES.length > 0) {
      await Service.insertMany(DEFAULT_SERVICES)
      console.log(`🌱 Auto-seeded ${DEFAULT_SERVICES.length} services to MongoDB Atlas`)
    }
  } catch (err) {
    console.error('Error auto-seeding MongoDB Atlas:', err)
  }
}

// REST API ENDPOINTS

// Health Check
app.get('/api/health', async (req, res) => {
  await ensureDbConnected()
  res.json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    cluster: 'cluster0.jvcfjru.mongodb.net',
  })
})

app.get('/api/projects', async (req, res) => {
  try {
    const list = await Project.find()
    list.sort((a, b) => (Number(a.no) || 0) - (Number(b.no) || 0))
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/projects', async (req, res) => {
  try {
    const proj = await Project.findOneAndUpdate({ no: req.body.no }, req.body, { upsert: true, new: true })
    res.json(proj)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.put('/api/projects/:no', async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate({ no: req.params.no }, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.delete('/api/projects/:no', async (req, res) => {
  try {
    await Project.findOneAndDelete({ no: req.params.no })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// TEAM MEMBERS API
app.get('/api/team', async (req, res) => {
  try {
    const list = await TeamMember.find().sort({ order: 1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/team', async (req, res) => {
  try {
    const member = await TeamMember.findOneAndUpdate({ id: req.body.id }, req.body, { upsert: true, new: true })
    res.json(member)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.put('/api/team/:id', async (req, res) => {
  try {
    const updated = await TeamMember.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.delete('/api/team/:id', async (req, res) => {
  try {
    await TeamMember.findOneAndDelete({ id: req.params.id })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// REPORTS API
app.get('/api/reports', async (req, res) => {
  try {
    const list = await Report.find().sort({ createdAt: -1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/reports', async (req, res) => {
  try {
    const body = { ...req.body }
    if (!body.id) body.id = 'rep-' + Date.now().toString().slice(-6)
    if (body.pdfUrl && body.pdfUrl.startsWith('data:')) {
      body.pdfUrl = saveBase64File(body.pdfUrl, 'reports', body.docName || body.title || 'report')
    }
    if (body.coverImage && body.coverImage.startsWith('data:')) {
      body.coverImage = saveBase64File(body.coverImage, 'covers', body.title || 'cover')
    }
    const rep = await Report.findOneAndUpdate({ id: body.id }, body, { upsert: true, new: true, setDefaultsOnInsert: true })
    res.json(rep)
  } catch (err) {
    console.error('Error in POST /api/reports:', err)
    res.status(400).json({ error: err.message })
  }
})

app.put('/api/reports/:id', async (req, res) => {
  try {
    const body = { ...req.body }
    if (body.pdfUrl && body.pdfUrl.startsWith('data:')) {
      body.pdfUrl = saveBase64File(body.pdfUrl, 'reports', body.docName || body.title || 'report')
    }
    if (body.coverImage && body.coverImage.startsWith('data:')) {
      body.coverImage = saveBase64File(body.coverImage, 'covers', body.title || 'cover')
    }
    const updated = await Report.findOneAndUpdate({ id: req.params.id }, body, { new: true, upsert: true })
    res.json(updated)
  } catch (err) {
    console.error('Error in PUT /api/reports/:id:', err)
    res.status(400).json({ error: err.message })
  }
})

app.delete('/api/reports/:id', async (req, res) => {
  try {
    await Report.findOneAndDelete({ id: req.params.id })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// CERTIFICATES API
app.get('/api/certificates', async (req, res) => {
  try {
    const list = await Certificate.find().sort({ createdAt: -1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/certificates', async (req, res) => {
  try {
    const body = { ...req.body }
    if (!body.id) body.id = 'cert-' + Date.now().toString().slice(-6)
    if (body.downloadUrl && body.downloadUrl.startsWith('data:')) {
      body.downloadUrl = saveBase64File(body.downloadUrl, 'certificates', body.client || 'certificate')
    }
    const cert = await Certificate.findOneAndUpdate({ id: body.id }, body, { upsert: true, new: true, setDefaultsOnInsert: true })
    res.json(cert)
  } catch (err) {
    console.error('Error in POST /api/certificates:', err)
    res.status(400).json({ error: err.message })
  }
})

app.put('/api/certificates/:id', async (req, res) => {
  try {
    const body = { ...req.body }
    if (body.downloadUrl && body.downloadUrl.startsWith('data:')) {
      body.downloadUrl = saveBase64File(body.downloadUrl, 'certificates', body.client || 'certificate')
    }
    const updated = await Certificate.findOneAndUpdate({ id: req.params.id }, body, { new: true, upsert: true })
    res.json(updated)
  } catch (err) {
    console.error('Error in PUT /api/certificates/:id:', err)
    res.status(400).json({ error: err.message })
  }
})

// CONSULTANTS API
app.get('/api/consultants', async (req, res) => {
  try {
    const list = await Consultant.find()
    list.sort((a, b) => {
      if (a.id === 'izhar-ali-hunzai') return -1
      if (b.id === 'izhar-ali-hunzai') return 1
      const orderA = a.order != null ? Number(a.order) : 99
      const orderB = b.order != null ? Number(b.order) : 99
      return orderA - orderB
    })
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/consultants', async (req, res) => {
  try {
    const consultant = await Consultant.findOneAndUpdate({ id: req.body.id }, req.body, { upsert: true, new: true })
    res.json(consultant)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.put('/api/consultants/:id', async (req, res) => {
  try {
    const updated = await Consultant.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.delete('/api/consultants/:id', async (req, res) => {
  try {
    await Consultant.findOneAndDelete({ id: req.params.id })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// COMPETENCIES API
app.get('/api/competencies', async (req, res) => {
  try {
    const list = await Competency.find().sort({ order: 1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/competencies/:id', async (req, res) => {
  try {
    const updateData = { ...req.body }
    if (updateData.image && updateData.image.startsWith('data:')) {
      updateData.image = saveBase64File(updateData.image, 'competencies', req.params.id)
    }
    const updated = await Competency.findOneAndUpdate({ id: req.params.id }, updateData, { new: true, upsert: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// SERVICES API
app.get('/api/services', async (req, res) => {
  try {
    await ensureDbConnected()
    const list = await Service.find().sort({ order: 1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/services/:id', async (req, res) => {
  try {
    await ensureDbConnected()
    const updateData = { ...req.body }
    if (updateData.image && updateData.image.startsWith('data:')) {
      updateData.image = saveBase64File(updateData.image, 'services', req.params.id)
    }
    const updated = await Service.findOneAndUpdate({ id: req.params.id }, updateData, { new: true, upsert: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.post('/api/services', async (req, res) => {
  try {
    await ensureDbConnected()
    const updateData = { ...req.body }
    if (updateData.image && updateData.image.startsWith('data:')) {
      updateData.image = saveBase64File(updateData.image, 'services', updateData.id || 'service')
    }
    const created = await Service.findOneAndUpdate({ id: updateData.id }, updateData, { new: true, upsert: true })
    res.json(created)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// CONTACT SUBMISSIONS API & EMAIL NOTIFICATION
app.post('/api/contact', async (req, res) => {
  try {
    const submissionData = {
      ...req.body,
      id: 'msg-' + Date.now().toString().slice(-6),
    }

    // 1. Save submission to MongoDB Atlas
    const submission = new ContactSubmission(submissionData)
    await submission.save()
    console.log(`📩 New contact submission from ${req.body.name} (${req.body.email}) saved to MongoDB Atlas`)

    // 2. Dispatch email notification to info@himatconsulting.com
    const recipientEmail = 'info@himatconsulting.com'
    const mailOptions = {
      from: `"HIMAT Website Contact" <${process.env.SMTP_USER || 'info@himatconsulting.com'}>`,
      to: recipientEmail,
      replyTo: req.body.email,
      subject: `📬 New Website Inquiry: ${req.body.subject || 'General Inquiry'} from ${req.body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #760CB0; margin-top: 0;">New Website Contact Form Submission</h2>
          <p style="color: #4b5563;">A new inquiry has been submitted via the official HIMAT Consulting website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; background: #faf5ff; color: #760CB0; width: 140px;">Full Name:</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #f3e8ff;">${req.body.name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; background: #faf5ff; color: #760CB0;">Organization:</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #f3e8ff;">${req.body.org || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; background: #faf5ff; color: #760CB0;">Email:</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #f3e8ff;"><a href="mailto:${req.body.email}">${req.body.email || 'N/A'}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; background: #faf5ff; color: #760CB0;">Phone:</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #f3e8ff;">${req.body.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; background: #faf5ff; color: #760CB0;">Subject:</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #f3e8ff;">${req.body.subject || 'General Inquiry'}</td>
            </tr>
          </table>

          <div style="background: #faf5ff; padding: 15px; border-radius: 8px; border-left: 4px solid #760CB0; margin-top: 15px;">
            <strong style="color: #760CB0; display: block; margin-bottom: 5px;">Message Content:</strong>
            <p style="color: #1f2937; line-height: 1.6; margin: 0; white-space: pre-wrap;">${req.body.message || ''}</p>
          </div>

          <p style="font-size: 12px; color: #9ca3af; margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 10px;">
            Submitted on ${new Date().toLocaleString()} PKT • Saved in MongoDB Atlas Database
          </p>
        </div>
      `,
    }

    let emailDispatched = false
    let emailErrorMsg = null

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const activeTransporter = createTransporter()
        await activeTransporter.sendMail(mailOptions)
        emailDispatched = true
        console.log(`✉️ Notification email successfully dispatched to ${recipientEmail}`)
      } else {
        emailErrorMsg = 'SMTP_PASS is missing in .env file.'
        console.log(`ℹ️ Email notification to ${recipientEmail} requires SMTP_PASS in .env. Submission saved in MongoDB Atlas.`)
      }
    } catch (mailErr) {
      emailErrorMsg = mailErr.message
      console.warn(`⚠️ Email dispatch failed: ${mailErr.message}. Submission saved safely in MongoDB Atlas.`)
    }

    res.json({ success: true, submission, emailDispatched, emailError: emailErrorMsg })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/contact', async (req, res) => {
  try {
    const list = await ContactSubmission.find().sort({ createdAt: -1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/contact/:id', async (req, res) => {
  try {
    await ContactSubmission.findOneAndDelete({ id: req.params.id })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// RESET & SEED ALL COLLECTIONS API
app.post('/api/reset-all', async (req, res) => {
  try {
    await Project.deleteMany({})
    await TeamMember.deleteMany({})
    await Report.deleteMany({})
    await Certificate.deleteMany({})
    await Competency.deleteMany({})
    await Consultant.deleteMany({})
    await Service.deleteMany({})

    await autoSeedIfEmpty()
    res.json({ success: true, message: 'All MongoDB Atlas collections reset to default datasets' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// SERVE STATIC VITE DIST FRONTEND IN PRODUCTION
const distPath = path.join(__dirname, '../dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Express MongoDB Server running on http://localhost:${PORT}`)
  })
}

export default app
