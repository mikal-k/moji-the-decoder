const express = require("express");
const bodyParser = require("body-parser");
const EmojiDictionary = require("emoji-dictionary");
const emojiUnicode = require("emoji-unicode");
const nodeEmoji = require("node-emoji");

// Creating Express app
const app = express();
app.use(bodyParser.json());
app.use(express.static("public_html"));

// Handling favicon.ico request
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Starting server and listening on port, dynamic if test env
const port = process.env.NODE_ENV === "test" ? 0 : 2950;
const server = app.listen(port, () => {
  console.log(`Moji server listening on port ${port}!`);
});

// Function to get emoji name with fallback
function getEmojiName(emoji) {
  let name = EmojiDictionary.getName(emoji);
  if (!name) {
    const emojiFromNode = nodeEmoji.find(emoji);
    if (emojiFromNode) {
      name = emojiFromNode.key;
    } else {
      name = "(unknown)";
    }
  }
  return name;
}

// Handling POST requests to /decode
app.post("/decode", (req, res) => {
  const { emoji } = req.body;
  if (!emoji) {
    res.status(400).json({ error: "No emoji provided" });
    return;
  }

  // Splitting the emoji into its components if it contains a ZWJ
  const info = decodeEmoji(emoji);

  console.log("Response data:", info); // Log the response data

  res.json(info);
});

app.get("/:emoji", (req, res) => {
  const emoji = decodeURIComponent(req.params.emoji);
  if (!emoji) {
    res.status(400).json({ error: "No emoji provided" });
    return;
  }

  // Splitting the emoji into its components if it contains a ZWJ
  const info = decodeEmoji(emoji);

  res.json(info);
});

// Exporting the Express app and server instances for testing
module.exports = { app, server };

function decodeEmoji(emoji) {
  const components = emoji.includes("\u200D") ? emoji.split("\u200D") : [emoji];
  return components.map((component) => {
    const name = getEmojiName(component);
    const codepoint = emojiUnicode(component).split(' ').map(part => `U+${part.toUpperCase()}`).join(' ');
    return { name, codepoint };
  });
}
