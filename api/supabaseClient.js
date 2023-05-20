import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL='https://jjukdkchrjkteghoabzb.supabase.co'
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqdWtka2NocmprdGVnaG9hYnpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjkzMjM2MCwiZXhwIjoxOTk4NTA4MzYwfQ.vl53rc8MZJAjvIjkbtRj4wy2OvpdSqm2XcoSR1nEE9w'


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
