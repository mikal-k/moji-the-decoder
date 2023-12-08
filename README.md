# Moji The Decoder 👁️‍🗨️🤖
A ZWJ emoji decoder written in Node.js.

Start:
node index.js

Modules used for the app: 
- `express` provides a web framework
- `body-parser` parses incoming request bodies (req.body)
- `EmojiDictionary` maps emojis to their names
- `emoji-unicode` generates the Unicode code point for an emoji

Modules used for linting and testing:

# User Interface (UI) Changes:
The latest update to Moji The Decoder has introduced several new changes to the user interface to improve the visualization of Zero Width Joiner (ZWJ) emojis. Notable changes include:

- **Character Segmentation Display**: ZWJ emojis are now displayed in distinct boxes for each joined character, enabling better representation and understanding of the emoji composition.
- **Modifier Information**: Enhanced display for emojis with skin tone or other modifiers, which shows both the visual representation and a textual description of the modifier in the corresponding box.
- **Emoji Component Information**: Each emoji component box now additionally provides the name and Unicode code point, and if the component name is unrecognized, a placeholder text 'Character not recognized' is shown.
- **Layout and Design**: The boxes are designed for readability with sufficient spacing and clear labeling, and the interface is fully responsive, ensuring a seamless experience across different devices and screen sizes.
- **User Interface Feedback**: Success and error feedback messages guide users through their interactions with the application, ensuring a smooth user experience.

Please refer to the `public_html/js/emojiDetails.js` file for the key JavaScript functions involved in this update and the `public_html/index.html` file for the changes made to the front-end structure and layout.
- `chai` asserts the results of tests using assertion functions
- `eslint` lints JavaScript code and reports any errors or warnings
- `husky` provides Git hooks to execute tasks on specified Git events
- `lint-staged` runs linting and other tasks on staged files before committing them
- `mocha` is a JavaScript test framework that runs tests and generates reports
- `supertest` provides high-level abstractions for testing HTTP servers
 
