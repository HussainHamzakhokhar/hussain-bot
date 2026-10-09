const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = '1399136463277961';
const VERIFY_TOKEN = 'hussain123';

app.get('/', (req, res) => {
  res.send('Hussain Digital Bot is LIVE!');
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
    const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (msg) {
      const from = msg.from;
      const text = msg.text?.body || '';

      let reply = "As-salamu Alaikum! Welcome to Hussain Digital Material Carriage 🚚\n\n1️⃣ Material List\n2️⃣ Price List\n3️⃣ Delivery Charges\n4️⃣ Talk to Owner";

      if (text == "1") {
        reply = "Our Materials:\n- Cement (Bestway, Lucky)\n- Steel / Sariya\n- Bricks Awwal\n- Crush / Bajri\n- Sand / Reti";
      }
      if (text == "2") {
        reply = "Today Islamabad Rates:\nCement: 1450/bag\nSteel: 245/kg\nBricks: 18/pc\n*Call owner for final rate*";
      }
      if (text == "3") {
        reply = "Delivery:\nIslamabad: 2000-4000/trolley\nRawalpindi: 3000-5000/trolley\nSend location for exact.";
      }
      if (text == "4") {
        reply = "Owner will call you in 5 mins InshaAllah. Please send your Name and
