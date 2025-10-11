import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

  if (!BUTTONDOWN_API_KEY) {
    return res.status(500).json({ error: 'API key is not configured' });
  }

  try {
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return res.status(201).json({ message: 'Successfully subscribed!' });
    } else {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.detail || 'An unknown error occurred' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
}
