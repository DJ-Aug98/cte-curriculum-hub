module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const id  = process.env.SPREADSHEET_ID;
  const key = process.env.SHEETS_API_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/All%20Programs!A:M?key=${key}`;

  try {
    const r    = await fetch(url);
    const data = await r.json();

    if (!r.ok) {
      return res.status(500).json({ error: data.error?.message || 'Sheets API error' });
    }

    const [headers, ...rows] = data.values || [];
    if (!headers) return res.json({ programs: [] });

    const programs = rows
      .filter(row => row[0])
      .map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] || ''])));

    res.json({ programs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
