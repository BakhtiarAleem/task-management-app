import { createClient } from '@supabase/supabase-js'

// const SUPABASE_URL='https://jjukdkchrjkteghoabzb.supabase.co'
// const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqdWtka2NocmprdGVnaG9hYnpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjkzMjM2MCwiZXhwIjoxOTk4NTA4MzYwfQ.vl53rc8MZJAjvIjkbtRj4wy2OvpdSqm2XcoSR1nEE9w'


const SUPABASE_URL=import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY=import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
