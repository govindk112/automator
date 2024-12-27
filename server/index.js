const fs = require('fs');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI('AIzaSyBO2zep2g4sURQHDLFls-kvBH1fUKWerjU');

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const pdfPath = 'CV_Iswar Kumar.pdf';

async function processResume() {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdf(dataBuffer);
        const text = pdfData.text;

        const sections = {
            education: /Education([\s\S]*?)(?=Experience|Projects|Skills|$)/i,
            experience: /Experience([\s\S]*?)(?=Education|Projects|Skills|$)/i,
            projects: /Projects([\s\S]*?)(?=Experience|Education|Skills|$)/i,
            skills: /Skills([\s\S]*)/i,
        };

        const personalDetailsRegex = {
            name: /([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/gm,
            phone: /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/gm,
            github: /(?:github\.com\/)([a-zA-Z0-9-_]+)/gm,
            linkedin: /(?:linkedin\.com\/in\/)([a-zA-Z0-9-_]+)/gm,
        };

        const extractSection = (sectionRegex) => {
            const match = text.match(sectionRegex);
            return match ? match[1].trim() : '';
        };

        const extractPersonalDetails = (regex) => {
            const matches = text.matchAll(regex);
            return Array.from(matches, (match) => match[0].trim());
        };

        const resumeJson = {
            metadata: pdfData.info,
            name: extractPersonalDetails(personalDetailsRegex.name)?.[0] || null,
            phone: extractPersonalDetails(personalDetailsRegex.phone)?.[0] || null,
            github: extractPersonalDetails(personalDetailsRegex.github)?.[0] || null,
            linkedin: extractPersonalDetails(personalDetailsRegex.linkedin)?.[0] || null,
            education: extractSection(sections.education),
            experience: extractSection(sections.experience),
            projects: extractSection(sections.projects),
            skills: extractSection(sections.skills),
        };

        const prompt = `This is extracted text data from a resume/CV PDF. Structure the information into a JSON format with fields for contactInfo (name, email, phone, linkedin, github, location), summary, experience (with company, title, dates, description), education (with institution, degree, dates), skills, projects (with name, description, dates if any), awards, and certifications. If any of the fields are not present, you can leave them null or empty. Try to infer dates and other missing details where possible but do not fabricate information. The extracted text is:\n\n\`\`\`\n${text}\n\`\`\``;

        const messages = [{ role: "user", parts: [{ text: prompt }] }];

        const result = await model.generateContent({ contents: messages, generationConfig });
        console.log(result.response.text);
        const response = result.response;

        if (response && response.text) {
            console.log("--- Gemini Response ---");
            const responseText = await response.text(); // Get the text with await
            console.log(responseText);
            
        } else {
            console.log("No response text received");
        }
      

    } catch (error) {
        console.error("Error:", error);
    }
}

processResume();