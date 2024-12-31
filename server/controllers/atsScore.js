
import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';


const app = express();
const port = 4000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);

// File upload setup
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max file size
});

// Function to get Gemini Response
const getGeminiResponse = async (input, pdfContent, prompt) => {
  const genAI = new GoogleGenerativeAI('AIzaSyBO2zep2g4sURQHDLFls-kvBH1fUKWerjU');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const generationConfig = {
      temperature: 0.7,
      top_p: 0.95,
      top_k: 40,
      max_output_tokens: 8192,
      response_mime_type: "text/plain",
  };
  try {
    const response = await model.generateContent([input, pdfContent[0], prompt], generationConfig);
    return response.data.text;
  } catch (error) {
    console.error('Error fetching Gemini response:', error.response?.data || error.message);
    throw new Error('Failed to fetch Gemini response');
  }
};

// Route for processing resume
app.post('/process-resume', upload.single('resume'), async (req, res) => {
  const { jobDescription, promptType } = req.body;
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  if (!jobDescription || typeof jobDescription !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing job description' });
  }

  const prompts = {
    review: `
      You are an experienced Technical Human Resource Manager. Review the provided resume against the job description. 
      Please share your professional evaluation on whether the candidate's profile aligns with the role. 
      Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
    `,
    percentageMatch: `
      You are a skilled ATS scanner with a deep understanding of data science and ATS functionality. 
      Evaluate the resume against the provided job description. Provide a percentage match, list missing keywords, 
      and share final thoughts.
    `,
  };

  const prompt = prompts[promptType];
  if (!prompt) {
    return res.status(400).json({ error: 'Invalid prompt type' });
  }

  try {
    const pdfContentBase64 = uploadedFile.buffer.toString('base64');
    const pdfParts = [
      {
        mime_type: 'application/pdf',
        data: pdfContentBase64,
      },
    ];

    const response = await getGeminiResponse(jobDescription, pdfParts, prompt);
    console.log('Response:', response);
    res.json({ result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing resume' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
