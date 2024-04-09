const express = require("express");
const bodyParser = require("body-parser");
const EmojiDictionary = require("emoji-dictionary");
const emojiUnicode = require("emoji-unicode");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public_html"));

const port = process.env.NODE_ENV === "test" ? 0 : 2950;
const server = app.listen(port, () => {
  console.log(`Moji server listening on port ${port}!`);
});

const decodeEmoji = (emoji) => {
  console.log(`Decoding emoji: ${emoji}`); // Log received emoji for debugging
  const components = emoji.split("\u200D");
  const info = components.map((component) => {
    const unicode = emojiUnicode(component).toUpperCase(); // Correctly declare the variable
    const name = EmojiDictionary.getName(component) || "(unknown)";
    console.log(`Component: ${component}, Unicode: U+${unicode}, Name: ${name}`); // Log each component
    return { component, name: name !== "null" ? name : "(unknown)", codepoint: `U+${unicode}` };
  });

  return info;
};

app.post("/decode", (req, res) => {
  const emoji = req.body.emoji;
  if (!emoji) {
    return res.status(400).json({ error: "No emoji provided" });
  }

  const info = decodeEmoji(emoji);
  if (info.some((component) => component.name === "(unknown)")) {
    return res.status(404).json({ error: "One or more emoji components not recognized", info });
  }

  res.json(info);
});

app.get("/decode/:emoji", (req, res) => {
  const emoji = decodeURIComponent(req.params.emoji);
  if (!emoji) {
    return res.status(400).json({ error: "No emoji provided" });
  }

  const info = decodeEmoji(emoji);
  if (info.some((component) => component.name === "(unknown)")) {
    return res.status(404).json({ error: "One or more emoji components not recognized", info });
  }

  res.json(info);
});

module.exports = { app, server };

