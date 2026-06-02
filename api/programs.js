const { google } = require('googleapis');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'All Programs!A:M',
    });

    const values = response.data.values || [];

    if (values.length < 2) {
      return res.json({ programs: [] });
    }

    const [headers, ...rows] = values;
    const programs = rows
      .filter(row => row[0])
      .map(row =>
        Object.fromEntries(headers.map((h, i) => [h, String(row[i] ?? '')]))
      );

    res.json({ programs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, detail: err.toString() });
  }
};
