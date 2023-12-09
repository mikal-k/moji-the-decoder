const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const { createEmojiBox, displayEmojiDetails, displayFeedback } = require('../public_html/js/emojiDetails.js');
const { app, server } = require("../moji");

describe('emojiDetails.js', () => {
  const { window } = new JSDOM();
  global.document = window.document;

  it('createEmojiBox should return a div with the correct information', () => {
    const emojiComponent = { emoji: '😀', name: 'grinning', codepoint: 'U+1F600' };
    const box = createEmojiBox(emojiComponent);
    expect(box.tagName).to.equal('DIV');
    expect(box.querySelector('.emoji').textContent).to.equal(emojiComponent.emoji);
    expect(box.querySelector('.name').textContent).to.equal(emojiComponent.name);
    expect(box.querySelector('.codepoint').textContent).to.equal(emojiComponent.codepoint);
  });

  it('displayEmojiDetails should display the correct number of boxes with the correct information', () => {
    const emojiComponents = [
      { emoji: '👨', name: 'man', codepoint: 'U+1F468' },
      { emoji: '👩', name: 'woman', codepoint: 'U+1F469' },
      { emoji: '👧', name: 'girl', codepoint: 'U+1F467' },
      { emoji: '👦', name: 'boy', codepoint: 'U+1F466' },
    ];
    displayEmojiDetails(emojiComponents);
    const boxes = document.getElementById('result').querySelectorAll('.emoji-box');
    expect(boxes.length).to.equal(emojiComponents.length);
    boxes.forEach((box, index) => {
      expect(box.querySelector('.emoji').textContent).to.equal(emojiComponents[index].emoji);
      expect(box.querySelector('.name').textContent).to.equal(emojiComponents[index].name);
      expect(box.querySelector('.codepoint').textContent).to.equal(emojiComponents[index].codepoint);
    });
  
  it('should correctly decode the emoji 👁️‍🗨️ and display its details', () => {
    const emojiComponent = { emoji: '👁️‍🗨️', name: 'eye in speech bubble', codepoint: 'U+1F441 U+200D U+1F5E8' };
    const box = createEmojiBox(emojiComponent);
    expect(box.tagName).to.equal('DIV');
    expect(box.querySelector('.emoji').textContent).to.equal(emojiComponent.emoji);
    expect(box.querySelector('.name').textContent).to.equal(emojiComponent.name);
    expect(box.querySelector('.codepoint').textContent).to.equal(emojiComponent.codepoint);
  });
});

  it('displayFeedback should display the correct message', () => {
    const message = 'Test message';
    displayFeedback(message);
    const resultDiv = document.getElementById('result');
    expect(resultDiv.textContent).to.equal(message);
  });
});
