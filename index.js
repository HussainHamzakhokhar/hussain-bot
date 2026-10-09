const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = '1399136463277961';
const VERIFY_TOKEN = 'hussain123';

app.get('/', (req, res) => {
  res.send('Bot LIVE');
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  try {
    const entry = req.body.entry && req.body.entry[0];
    const changes = entry && entry.changes && entry.changes[0];
    const value = changes && changes.value;
    const msg = value && value.messages && value.messages[0];

    if (msg) {
      const from = msg.from;
      const body = msg.text && msg.text.body? msg.text.body.trim() : '';
      let reply = 'Salam! Welcome to Hussain Digital\n1 Material\n2 Price\n3 Delivery\n4 Owner';

      if (body === '1') {
        reply = 'Materials: Cement, Steel, Bricks, Crush, Sand';
      }
      if (body === '2') {
        reply = 'Rates: Cement 1450/bag, Steel 245/kg, Bricks 18/pc. Call for final rate.';
      }
      if (body === '3') {
        reply = 'Delivery: Islamabad 2000-4000, Rawalpindi 3000-5000 per trolley.';
      }
      if (body === '4') {
        reply = 'Owner will call you in 5 mins. Please send name and location.';
      }

      await axios.post(
        'https://graph.facebook.com/v23.0/' + PHONE_ID + '/messages',
        {
          messaging_product: 'whatsapp',
          to: from,
          type: 'text',
          text: { body: reply }
        },
        {
          headers: { Authorization: 'Bearer ' + TOKEN }
        }
      );
    }
    res.sendStatus(200);
  } catch (e) {
    console.log('Error', e.message);
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Bot running on ' + PORT));
