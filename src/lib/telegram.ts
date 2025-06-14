export async function sendTelegramMessage(message: string) {
  try {
    console.log('=== Telegram Message Debug ===');
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    console.log('Bot Token exists:', !!TELEGRAM_BOT_TOKEN);
    console.log('Chat ID exists:', !!TELEGRAM_CHAT_ID);
    console.log('Chat ID value:', TELEGRAM_CHAT_ID);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Telegram configuration is missing');
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    console.log('Request URL:', url);

    const requestBody = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    };
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-cache',
    });

    console.log('Response Status:', response.status);
    console.log('Response Status Text:', response.statusText);

    const responseData = await response.json();
    console.log('Response Data:', JSON.stringify(responseData, null, 2));
    
    if (!response.ok) {
      console.error('Telegram API Error:', responseData);
      throw new Error(`Failed to send Telegram message: ${response.status} ${response.statusText}`);
    }

    console.log('Telegram message sent successfully');
    console.log('=== End Telegram Debug ===');
    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
} 