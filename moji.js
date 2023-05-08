// Moji the Decoder
// An emoji lookup tool by Mikal Krogstad
// (Early beta)
const express = require('express');
const bodyParser = require('body-parser');
const EmojiDictionary = require('emoji-dictionary');
const emojiUnicode = require('emoji-unicode');

// Creating Express app
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Starting server and listening on port, dynamic if test env
const port = process.env.NODE_ENV === 'test' ? 0 : 3000;
const server = app.listen(port, () => {
  console.log(`Moji server listening on port ${port}!`);
});

// Handling POST requests to /decode
app.post('/decode', (req, res) => {
  const { emoji } = req.body;
  if (!emoji) {
    res.status(200).json({ error: 'No emoji provided' });
    return;
  }

  // Looking up emoji name and handling null/undefined results, generate hex code
  let emojiName = EmojiDictionary.getName(emoji);
  emojiName = emojiName === "null" || !emojiName ? '(unknown)' : emojiName;
  const hexcode = `U+${emojiUnicode(emoji).toUpperCase()}`;
  res.json({ name: emojiName, hexcode: hexcode });
});

// Exporting the Express app and server instances for testing
module.exports = { app, server };

