document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const emoji = urlParams.get("emoji");
  if (emoji) {
    const emojiInput = document.getElementById("emoji-input");
    emojiInput.value = emoji;
    // Don't auto-submit here; let the user check the input first
  }
});

document.getElementById("decode-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const emojiInput = document.getElementById("emoji-input");
  const resultDiv = document.getElementById("result");
  const emoji = emojiInput.value;

  if (!emoji) {
    resultDiv.textContent = "Please enter an emoji.";
    return;
  }

  updateURLWithEmoji(emoji); // Update the URL when submitting manually

  const response = await fetch("/decode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emoji }),
  });

  if (response.ok) {
    const data = await response.json();
    resultDiv.innerHTML = ""; // Clear previous results
    data.forEach((item, index) => {
      const emojiElement = document.createElement("div");
      emojiElement.className = "text-center mb-2";
      emojiElement.innerHTML = `
        <div style="font-size: 2em;">${item.codepoint.split(' ').map(cp => String.fromCodePoint(parseInt(cp.slice(2), 16))).join('')}</div>
        <div>Emoji name: ${item.name}<br>Codepoint: ${item.codepoint}</div>
      `;
      resultDiv.appendChild(emojiElement);

      if (index < data.length - 1) {
        const hr = document.createElement("hr");
        hr.style.width = "80%";
        resultDiv.appendChild(hr);
      }
    });
  } else {
    resultDiv.textContent = "Error: Could not decode emoji.";
  }
});

function updateURLWithEmoji(emoji) {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  if (params.get("emoji") !== emoji) { // Only update if different
    params.set("emoji", emoji);
    window.history.replaceState({}, "", `${url.pathname}?${params}`);
  }
}

