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
  if (name === "null" || !name) {
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
    res.status(200).json({ error: "No emoji provided" });
    return;
  }

  // Splitting the emoji into its components if it contains a ZWJ
  const components = emoji.includes("\u200D") ? emoji.split("\u200D") : [emoji];

  // Retrieving the information for each component of the emoji
  const info = components.map((component) => {
    const name = getEmojiName(component);
    const codepoint = emojiUnicode(component).split(' ').map(part => `U+${part.toUpperCase()}`).join(' ');

    // Debug logging
    console.log(`Component: ${component}, Name: ${name}, Codepoint: ${codepoint}`);

    return { name, codepoint };
  });

  console.log("Response data:", info); // Log the response data

  res.json(info);
});

app.get("/:emoji", (req, res) => {
  const emoji = decodeURIComponent(req.params.emoji);
  if (!emoji) {
    res.status(200).json({ error: "No emoji provided" });
    return;
  }

  // Splitting the emoji into its components if it contains a ZWJ
  const components = emoji.includes("\u200D") ? emoji.split("\u200D") : [emoji];

  // Retrieving the information for each component of the emoji
  const info = components.map((component) => {
    const name = getEmojiName(component);
    const codepoint = emojiUnicode(component).split(' ').map(part => `U+${part.toUpperCase()}`).join(' ');

    // Debug logging
    console.log(`Component: ${component}, Name: ${name}, Codepoint: ${codepoint}`);

    return { name, codepoint };
  });

  res.json(info);
});

// Exporting the Express app and server instances for testing
module.exports = { app, server };

