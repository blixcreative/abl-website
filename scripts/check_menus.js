const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
const url = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/"/g, '');
const key = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim().replace(/"/g, '');

fetch(`${url}/rest/v1/cms_menu_items?select=*`, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`
  }
}).then(r => r.json()).then(data => {
  console.log("MENU ITEMS IN DB:");
  console.log(JSON.stringify(data, null, 2));
}).catch(console.error);

fetch(`${url}/rest/v1/header_content?select=*`, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`
  }
}).then(r => r.json()).then(data => {
  console.log("HEADER CONTENT IN DB:");
  console.log(JSON.stringify(data, null, 2));
}).catch(console.error);