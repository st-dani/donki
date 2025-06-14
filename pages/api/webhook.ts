import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;
    const zapierWebhookUrl = process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL;

    if (!zapierWebhookUrl) {
      throw new Error('Zapier webhook URL is not configured');
    }

    // Forward the data to Zapier
    const zapierResponse = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!zapierResponse.ok) {
      throw new Error('Failed to send data to Zapier');
    }

    return res.status(200).json({ 
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to process message'
    });
  }
} 