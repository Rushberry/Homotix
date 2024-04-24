import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAIzgfAefuMMEcdxdTsVO9v9sZFHBOmOPc";
const genAI = new GoogleGenerativeAI(API_KEY);

const MAX_RETRIES = 5;
let retryCount = 0;
let lastErrorMessage = "";

async function generateText() {
  const userPrompt = document.getElementById("userPrompt").value.trim();
  const prompt = `:prompt-->
  Provide brief, concise answers with 5 top homeopathy medicines comma-separated format without additional text or formatting.; verify symptom validity, correct spelling errors, offer medicine for related diseases if applicable if not then return "It is not a valid symptom.". Remember cancer and tumor are valid.
  [Now Answer the following symptom] -------${userPrompt}`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Update the HTML with the input and generated text wrapped in span tags
    document.getElementById("generatedText").innerHTML = `<p class="user">${userPrompt}</p><p class="outp">${text}</p>`;

    // Reset retry count if successful
    retryCount = 0;
    lastErrorMessage = "";
  } catch (error) {
    console.error("Error generating text:", error);
    
    // Check if the error message matches the last encountered error message
    if (error.message === lastErrorMessage) {
      retryCount++;
    } else {
      retryCount = 1; // Start counting from 1 if it's a new error message
      lastErrorMessage = error.message;
    }

    // If the error message is "It is not a valid symptom." and retry count exceeds maximum retries, stop retrying
    if (error.message === "It is not a valid symptom." && retryCount >= MAX_RETRIES) {
      console.error("Max retry limit reached. Stopping.");
      return;
    }

    // Retry
    await generateText(); // Recursive call
  }
  
  document.getElementById("userPrompt").value = "";
}

document.getElementById("generateButton").addEventListener("click", generateText);

document.getElementById("userPrompt").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    generateText();
  }
});
