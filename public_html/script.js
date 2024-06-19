document.getElementById("decode-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const emojiInput = document.getElementById("emoji-input");
  const resultDiv = document.getElementById("result");
  const emoji = emojiInput.value;
  updateURLWithEmoji(emoji);

  function updateURLWithEmoji(emoji) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set("emoji", emoji);
    window.history.replaceState({}, "", `${url.pathname}?${params}`);
  }

  if (!emoji) {
    resultDiv.textContent = "Please enter an emoji.";
    return;
  }

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

      // Add horizontal ruler between emojis
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

