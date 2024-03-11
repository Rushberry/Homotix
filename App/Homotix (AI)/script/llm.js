import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAIzgfAefuMMEcdxdTsVO9v9sZFHBOmOPc";
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateText() {
  const userPrompt = document.getElementById("userPrompt").value.trim();
  const prompt = ` 1.[Who are u, who made u, who is rushan, who is the ceo, what is Rushberry Ltd.-if u are asked then answer briefly within 10 words{caution never give short answer} --- I am Homotix, an AI created by Md Rafsan Afnan Rushan [CEO of Rushberry Ltd.]]
            2.[Answering Homeopathy medicine according to the given symptom, this ai is made for helping the homeopath doctors.] 
            3.[While giving the answer maintain giving a short answer which should not extend more than 7 words}]
            4.[Which homeopathy medicine is used best for the given symptom give 5-7 homeopathy medicine best for the given symptom and don't use less important medicine always suggest the best medicine of all with a comma no need for numbering]
            5.[remember if the symptom is not a valid symptom check it and try to match whether it is related to any desease and if it matches with the disease then give the medicine for that disease]
            5.[Check if there is any spelling mistake for example for fever if the user writes fevr then term it as fever and so on]
            ***IMPORTANT:6.[If after trying a lot if the input is not correct then write it is --'It is not a valid symptom' and 
            ***IMPORTANT:7.[If any medicine is given as input then tell about shortly within 25 words]
            8.[never use symbols like "**"]
            9.[never say "Seek immediate medical attention.","Consult a doctor for Brain Stroke." --because it is made for doctors]
            ***10.[Most important Never give response like this -- 'Consult a homeopath for malignant tumor.','Consult a homeopath.' --- because this ai is made for helping the homeopath doctors]
            *****11.[most important use the short form of the medicine for example for aconitum napellus use Aconite but never use like these short forms 'ACON, BELL, GELS, RHUS-T, BRY' because these are disgusting]

[Answer the following symptom] -------${userPrompt}`;

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