function createEmojiBox(emojiComponent) {
  const box = document.createElement('div');
  box.className = 'emoji-box';
  box.innerHTML = `
    <div class="emoji">${emojiComponent.emoji}</div>
    <div class="name">${emojiComponent.name}</div>
    <div class="codepoint">${emojiComponent.codepoint}</div>
  `;
  return box;
}

function displayEmojiDetails(emojiComponents) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  emojiComponents.forEach(component => {
    // Handle case where name or codepoint is undefined
    if (component.name === undefined || component.codepoint === undefined) {
      displayFeedback('Emoji not recognized');
      return;
    }
    const box = createEmojiBox(component);
    resultDiv.appendChild(box);
  });
}

function displayFeedback(message) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = message;
}

document.getElementById('decode-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const emojiInput = document.getElementById('emoji-input');
  const emoji = emojiInput.value;

  if (!emoji) {
    displayFeedback('Please enter an emoji.');
    return;
  }

  const response = await fetch('/decode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emoji }),
  });

  if (response.ok) {
    const data = await response.json();
    displayEmojiDetails(data);
  } else {
    displayFeedback('Error: Could not decode emoji.');
  }
});
