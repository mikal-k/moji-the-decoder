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

  // Splitting the emoji into its components if it contains a ZWJ
  const components = emoji.includes("\u200D") ? emoji.split("\u200D") : [emoji];

  // Retrieving the information for each component of the emoji
  const info = components.map((component) => {
    let name = EmojiDictionary.getName(component);
    name = name === "null" || !name ? "(unknown)" : name;
    const codepoint = `U+${emojiUnicode(component).toUpperCase()}`;

    if (name === "(unknown)" || typeof codepoint === 'undefined') {
      res.status(200).json({ error: "Emoji not recognized" });
      return;
    }

    // Debug logging
    console.log(
      `Component: ${component}, Name: ${name}, Codepoint: ${codepoint}`,
    );

    return { name, codepoint };
  });

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
    let name = EmojiDictionary.getName(component);
    name = name === "null" || !name ? "(unknown)" : name;
    const codepoint = `U+${emojiUnicode(component).toUpperCase()}`;

    // Debug logging
    console.log(
      `Component: ${component}, Name: ${name}, Codepoint: ${codepoint}`,
    );

    return { name, codepoint };
  });

  res.json(info);
});

// Exporting the Express app and server instances for testing
module.exports = { app, server };
