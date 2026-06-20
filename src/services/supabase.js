import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gupsdszmfsslifmtvvdn.supabase.co'
const supabaseKey = 'sb_publishable_bhSoYm08kYpjuLklkI5ahA_YOPHtl9V'

export const supabase = createClient(supabaseUrl, supabaseKey)