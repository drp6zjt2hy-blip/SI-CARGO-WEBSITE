const SUPABASE_URL = 'https://cjihmglgwjtbxxxwqxqm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqaWhtZ2xnd2p0Ynh4eHdxeHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MzA0MjMsImV4cCI6MjA5NTQwNjQyM30.YGVjI-dHluZY3MUfE3a5C-mzpxkVQbLpZAWcnWfJvVI';

async function supabase(method, table, body = null, query = "") {

  const url = `${SUPABASE_URL}/rest/v1/${table}?${query}`;

  const options = {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  // SHOW REAL ERROR
  if (!res.ok) {
    const text = await res.text();
    console.error("Supabase Error:", text);
    throw new Error(text);
  }

  return await res.json();
}