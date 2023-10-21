// Moji the Decoder
// An emoji lookup tool by Mikal Krogstad
// (Early beta)
const express = require("express");
const bodyParser = require("body-parser");
const EmojiDictionary = require("emoji-dictionary");
const emojiUnicode = require("emoji-unicode");

// Creating Express app
const app = express();
app.use(bodyParser.json());
app.use(express.static("public_html"));

// Starting server and listening on port, dynamic if test env
const port = process.env.NODE_ENV === "test" ? 0 : 2950;
const server = app.listen(port, () => {
  console.log(`Moji server listening on port ${port}!`);
});

// Handling POST requests to /decode
app.post("/decode", (req, res) => {
  const { emoji } = req.body;
  if (!emoji) {
    res.status(200).json({ error: "No emoji provided" });
    return;
  }

  // Looking up emoji name and handling null/undefined results, generate codepoint
  let emojiName = EmojiDictionary.getName(emoji);
  emojiName = emojiName === "" ? "(unknown)" : emojiName;
  const codepoint = `U+${emojiUnicode(emoji).toUpperCase()}`;
  if (codepoint === "U+") {
    res.status(400).json({ error: "Invalid emoji" });
    return;
  }
  res.status(200).json({ name: emojiName, codepoint: codepoint });
});
app.get("/:emoji", (req, res) => {
  const emoji = decodeURIComponent(req.params.emoji);
  if (!emoji) {
    res.status(200).json({ error: "No emoji provided" });
    return;
  }

  // Looking up emoji name and handling null/undefined results, generate codepoint
  let emojiName = EmojiDictionary.getName(emoji);
  emojiName = emojiName === "null" || !emojiName ? "(unknown)" : emojiName;
  const codepoint = `U+${emojiUnicode(emoji).toUpperCase()}`;
  res.status(200).json({ name: emojiName, codepoint: codepoint }).end();
});

// Exporting the Express app and server instances for testing
module.exports = { app, server };
