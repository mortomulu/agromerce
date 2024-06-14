// pages/api/callback.js
import axios from 'axios';
import qs from 'qs';

export default async function handler(req, res) {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      'https://api.x.com/oauth2/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = tokenResponse.data;
    res.redirect(`/form-add-product?access_token=${access_token}`);
  } catch (error) {
    console.error('Error obtaining access token:', error.response.data);
    res.status(500).json({ error: 'Failed to obtain access token' });
  }
}
