import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL='https://jjukdkchrjkteghoabzb.supabase.co'
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqdWtka2NocmprdGVnaG9hYnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5MzIzNjAsImV4cCI6MTk5ODUwODM2MH0.NAIo2XrtA8LIVBwbI07BwQMLTwIUXti9ok_bJRdBs5g'


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
