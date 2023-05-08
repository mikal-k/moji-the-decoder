1. Emoji name: Display the human-readable name or description of the pasted emoji.
2. Unicode code point: Show the Unicode code point(s) associated with the pasted emoji.
3. Emoji category: Indicate the category or group the emoji belongs to.
4. Keywords or aliases: Present a list of keywords or aliases related to the emoji.
5. Variants: Display different skin tone or gender variants of the emoji if applicable.
6. Platform-specific renderings: Show how the emoji appears on different platforms.
7. Copy button: Provide a button to easily copy the emoji, its name, or Unicode code point.
8. Emoji history or origin: Offer a brief history or origin of the emoji.
9. Related emojis: Display emojis related to the pasted emoji, either by similarity or usage.
10. Usage examples: Show examples of how the emoji is used in sentences or phrases.


| Library                     |Name|\U+ |Shrt|Btmp|Skin|iURL|
|-----------------------------|----|----|----|----|----|----|
| EmojiDictionary             | ✔️  | ✔️  | ❌ | ❌ | ❌ | ❌ |
| emoji-unicode               | ✔️  | ✔️  | ❌ | ❌ | ❌ | ❌ |
| node-emoji                  | ✔️  | ❌ | ✔️  | ❌ | ✔️  | ❌ |
| emojione                    | ✔️  | ✔️  | ❌ | ✔️  | ✔️  | ✔️  |
| twemoji`                    | ❌ | ✔️  | ❌ | ✔️  | ✔️  | ✔️  |
| i18next-emoji-postprocessor | ❌ | ✔️  | ❌ | ❌ | ❌ | ❌ |

Some notes on the table:
- `EmojiDictionary` and `emoji-unicode` only provide the emoji name and Unicode code point, which are essential attributes for working with emojis.
- `node-emoji` is designed for shortcodes, so it provides an API to translate shortcodes into their corresponding emojis. It also provides skin tone variations of emojis.
- `emojione` focuses on providing a consistent style across platforms and supports image URLs for the HTML representation of the emoji.
- `twemoji` provides a bitmap icon (a PNG file) for the emoji and supports different Unicode versions. It also offers multiple styles of emoji icons.
- `i18next-emoji-postprocessor` only converts Unicode code points to HTML entities or image URLs.

