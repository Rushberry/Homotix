import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAIzgfAefuMMEcdxdTsVO9v9sZFHBOmOPc";
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateText() {
  const userPrompt = document.getElementById("userPrompt").value.trim();
  const prompt = `:prompt-->
  Provide brief, concise answers with 5 top homeopathy medicines comma-separated format without additional text or formatting.; verify symptom validity, correct spelling errors, offer medicine for related diseases if applicable if not then return "It is not a valid symptom.". Remember cancer and tumor are valid.
  [Now Answer the following symptom] -------${userPrompt}`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let invalidSymptomCounter = 0; // Counter for invalid symptom response
  
  while (invalidSymptomCounter < 5) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      // Check if response is "It is not a valid symptom." or empty string
      if (text.trim() === "It is not a valid symptom." || text.trim() === '') {
        invalidSymptomCounter++;
        continue; // Retry if invalid symptom response
      }

      // Update the HTML with the input and generated text wrapped in span tags
      document.getElementById("generatedText").innerHTML = `<p class="user">${userPrompt}</p><p class="outp">${text}</p>`;

      // Disable the button
      document.getElementById("generateButton").disabled = true;

      // Change the SVG inside the button
      document.getElementById("generateButton").innerHTML = `<svg class="btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H360c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V67c0 40.3-16 79-44.5 107.5L225.9 256l81.5 81.5C336 366 352 404.7 352 445v19h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8V445c0-40.3 16-79 44.5-107.5L158.1 256 76.5 174.5C48 146 32 107.3 32 67V48H24C10.7 48 0 37.3 0 24zM110.5 371.5c-3.9 3.9-7.5 8.1-10.7 12.5H284.2c-3.2-4.4-6.8-8.6-10.7-12.5L192 289.9l-81.5 81.5zM284.2 128C297 110.4 304 89 304 67V48H80V67c0 22.1 7 43.4 19.8 61H284.2z"/></svg>`;

      // Set a timeout to revert the button SVG and enable the button after 5 seconds
      setTimeout(() => {
        document.getElementById("generateButton").disabled = false;
        document.getElementById("generateButton").innerHTML = `<svg class="btn" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path fill="#ffffff" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>`;
      }, 5000);

      break; // Break the loop if valid response is received
    } catch (error) {
      console.error("Error generating text:", error);
      // Retry on error
    }
  }

  // Stop retrying if the maximum retry limit is reached
  if (invalidSymptomCounter === 5) {
    console.error("Maximum retry limit reached for invalid symptom or empty response.");
    document.getElementById("generatedText").innerHTML = "<p class='outp'>It is not a valid symptom.</p>";
  }
  
  document.getElementById("userPrompt").value = "";
}

document.getElementById("generateButton").addEventListener("click", generateText);

document.getElementById("userPrompt").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    generateText();
  }
});
