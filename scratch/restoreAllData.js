import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { DEFAULT_PROJECTS } from '../src/data/projects.js'
import { DEFAULT_TEAM } from '../src/data/team.js'
import { PUBLISHED_REPORTS } from '../src/data/reportsData.js'
import { DEFAULT_COMPETENCIES } from '../src/data/competenciesData.js'
import { CLIENT_CERTIFICATES } from '../src/data/certificatesData.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hcplofficial1_db_user:EulaTaXCA07QeJdz@cluster0.jvcfjru.mongodb.net/himat_db?retryWrites=true&w=majority&appName=Cluster0'

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
  year: String,
  sector: String,
  type: String,
  coverage: String,
  pages: String,
  pdfUrl: String,
  coverImage: String,
  summary: String,
  keyFindings: [String],
  methodology: String,
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

const Project = mongoose.model('Project', ProjectSchema)
const TeamMember = mongoose.model('TeamMember', TeamSchema)
const Report = mongoose.model('Report', ReportSchema)
const Certificate = mongoose.model('Certificate', CertificateSchema)
const Competency = mongoose.model('Competency', CompetencySchema)

async function restoreAll() {
  try {
    console.log('Connecting to MongoDB Atlas...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB Atlas!')

    // Projects
    const pCount = await Project.countDocuments()
    if (pCount === 0) {
      await Project.insertMany(DEFAULT_PROJECTS)
      console.log(`✅ Seeded ${DEFAULT_PROJECTS.length} Projects`)
    } else {
      console.log(`ℹ️ Projects collection has ${pCount} items`)
    }

    // Team
    const tCount = await TeamMember.countDocuments()
    if (tCount === 0) {
      await TeamMember.insertMany(DEFAULT_TEAM)
      console.log(`✅ Seeded ${DEFAULT_TEAM.length} Team Members`)
    } else {
      console.log(`ℹ️ Team collection has ${tCount} items`)
    }

    // Reports
    await Report.deleteMany({})
    await Report.insertMany(PUBLISHED_REPORTS)
    console.log(`✅ Seeded ${PUBLISHED_REPORTS.length} Reports`)

    // Certificates
    const certCount = await Certificate.countDocuments()
    if (certCount === 0) {
      await Certificate.insertMany(CLIENT_CERTIFICATES)
      console.log(`✅ Seeded ${CLIENT_CERTIFICATES.length} Certificates`)
    } else {
      console.log(`ℹ️ Certificates collection has ${certCount} items`)
    }

    // Competencies
    const compCount = await Competency.countDocuments()
    if (compCount === 0) {
      await Competency.insertMany(DEFAULT_COMPETENCIES)
      console.log(`✅ Seeded ${DEFAULT_COMPETENCIES.length} Competencies`)
    } else {
      console.log(`ℹ️ Competencies collection has ${compCount} items`)
    }

    console.log('🎉 ALL DATASETS RESTORED SUCCESSFULLY TO MONGODB ATLAS!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Restore error:', err)
    process.exit(1)
  }
}

restoreAll()
