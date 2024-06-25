import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://puhrfarlbenxgccicdhl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1aHJmYXJsYmVueGdjY2ljZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyNTQzMjQsImV4cCI6MjAzNDgzMDMyNH0.Or69J129Ql2YqUK4JwWak-jmVdSQ4bIcdDPFI6qZkwU';

export const supabase = createClient(supabaseUrl, supabaseKey);