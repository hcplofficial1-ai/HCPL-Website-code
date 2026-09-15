import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { PUBLISHED_REPORTS } from '../src/data/reportsData.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hcplofficial1_db_user:EulaTaXCA07QeJdz@cluster0.jvcfjru.mongodb.net/himat_db?retryWrites=true&w=majority&appName=Cluster0'

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

const Report = mongoose.model('Report', ReportSchema)

async function sync() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB Atlas')
    await Report.deleteMany({})
    console.log('Cleared existing reports from MongoDB Atlas')
    await Report.insertMany(PUBLISHED_REPORTS)
    console.log(`Successfully inserted ${PUBLISHED_REPORTS.length} official reports into MongoDB Atlas!`)
    process.exit(0)
  } catch (err) {
    console.error('Error syncing reports:', err)
    process.exit(1)
  }
}

sync()
