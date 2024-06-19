const express = require("express");
const bodyParser = require("body-parser");
const EmojiDictionary = require("emoji-dictionary");
const emojiUnicode = require("emoji-unicode");
const TwemojiParser = require("twemoji-parser");

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

// Handling POST requests to /decode
app.post("/decode", (req, res) => {
  const { emoji } = req.body;
  if (!emoji) {
    res.status(200).json({ error: "No emoji provided" });
    return;
  }

  // Parsing the emoji into its components using twemoji-parser
  const components = TwemojiParser.parse(emoji, { assetType: "png" });

  // Retrieving the information for each component of the emoji
  const info = components.map((component) => {
    const emojiChar = component.text;
    let name = EmojiDictionary.getName(emojiChar);
    name = name === "null" || !name ? "(unknown)" : name;
    const codepoint = `U+${emojiUnicode(emojiChar).toUpperCase()}`;

    // Debug logging
    console.log(
      `Component: ${emojiChar}, Name: ${name}, Codepoint: ${codepoint}`,
    );

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

  // Parsing the emoji into its components using twemoji-parser
  const components = TwemojiParser.parse(emoji, { assetType: "png" });

  // Retrieving the information for each component of the emoji
  const info = components.map((component) => {
    const emojiChar = component.text;
    let name = EmojiDictionary.getName(emojiChar);
    name = name === "null" || !name ? "(unknown)" : name;
    const codepoint = `U+${emojiUnicode(emojiChar).toUpperCase()}`;

    // Debug logging
    console.log(
      `Component: ${emojiChar}, Name: ${name}, Codepoint: ${codepoint}`,
    );

    return { name, codepoint };
  });

  res.json(info);
});

// Exporting the Express app and server instances for testing
module.exports = { app, server };
