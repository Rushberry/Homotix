import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAIzgfAefuMMEcdxdTsVO9v9sZFHBOmOPc";
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateText() {
  const userPrompt = document.getElementById("userPrompt").value.trim();
  const prompt = `:prompt-->
  Provide brief, concise answers with 5-7 top homeopathy medicines comma-separated format without additional text or formatting.; verify symptom validity, correct spelling errors, offer medicine for related diseases if applicable if not then return "It is not a valid symptom. Sorry try again.". Remember cancer and tumor are valid.
  [Now Answer the following symptom] -------${userPrompt}`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Update the HTML with the input and generated text wrapped in span tags
    document.getElementById("generatedText").innerHTML = `<p class="user">${userPrompt}</p><p class="outp">${text}</p>`;
  } catch (error) {
    console.error("Error generating text:", error);
    console.log(error)
  } 
 
  
  document.getElementById("userPrompt").value = "";
}

document.getElementById("generateButton").addEventListener("click", generateText);

document.getElementById("userPrompt").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    generateText();
  }
});