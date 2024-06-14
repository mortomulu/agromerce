// pages/api/tweet.js
import axios from 'axios';

export default async function handler(req, res) {
  const { access_token, name, price, category, desc } = req.body;

  try {
    const response = await axios.post(
      'https://api.x.com/2/tweets',
      { text: `Product: ${name}, Price: ${price}, Category: ${category}, Description: ${desc}` },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error posting tweet:', error.response.data);
    res.status(500).json({ error: 'Failed to post tweet' });
  }
}
