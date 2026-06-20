import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envPath = path.join(__dirname, '..', '.env')

if (!fs.existsSync(envPath)) {
  const envContent = `VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here`
  
  fs.writeFileSync(envPath, envContent)
  console.log('✅ .env file created successfully')
} else {
  console.log('✅ .env file already exists')
}