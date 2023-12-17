const chatInput = document.querySelector("#chat-input");
  const sendButton = document.querySelector("#send");
  const chatContainer = document.querySelector(".chat-container");
  let userText = null;
  const API_KEY = "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";

  const createChatElement = (content, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
  };

  const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: userText,
        max_tokens: 2048,
        temperature: 0.2,
        n: 1,
        stop: null
      })
    };

    try {
      const response = await (await fetch(API_URL, requestOptions)).json();
      const responseData = response.choices[0].text.trim();
      const chatResponse = responseData.replace("undefined", "");
      pElement.textContent = chatResponse;
    } catch (error) {
      pElement.classList.add("error");
      pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }

    incomingChatDiv.appendChild(pElement);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  };

  const showOutgoingChat = () => {
      const extraText = "{role: You are Homotix (an Ai By Md Rafsan Afnan Rushan)--the CEO of Rushberry Ltd.-- for answering Homeopathy medicine according to the given symptom ,also tell them to write the symptom for which they are looking for. While giving the answer maintain giving a short answer which should not extend more than 5 words} Prompt: Which homeopathy medicine is used best for the given symptom give 4-5 homeopathy medicine best for this with a comma no need for numbering -[remember if the symptom is not a valid symptom then write it is not a valid symptom and if any medicine is given as input then tell about shortly] {now answer the following symptom} -";
      const userInput = chatInput.value.trim();
      if (!userInput) return;
      userText = extraText + userInput;
      chatInput.value = "";
  
      // Clear previous chat
      chatContainer.innerHTML = "";
  
      const html = `<div class="chat outgoing">
                      <p><span style="display: none;">${extraText}</span><span class='user'>${userInput}</span></p>
                    </div>`;
  
      const outgoingChatDiv = createChatElement(html, "outgoing");
      chatContainer.appendChild(outgoingChatDiv);
      showTypingAnimation();
  };

  const showTypingAnimation = () => {
    const html = `<div class="chat incoming">
                    <div class="typing-animation">
                        <div class="typing-dot" style="--delay: 0.2s"></div>
                        <div class="typing-dot" style="--delay: 0.3s"></div>
                        <div class="typing-dot" style="--delay: 0.4s"></div>
                    </div>
                </div>`;

    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
  };

  sendButton.addEventListener("click", showOutgoingChat);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      showOutgoingChat();
    }
  });