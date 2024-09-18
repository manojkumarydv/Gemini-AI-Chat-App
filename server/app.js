import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const geminiApiKey = process.env.API_KEY;

const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

app.use(express.json());
app.use(cors())

const generate = async (question) => {
  try {
    const prompt = question;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Response error:", error);
  }
};

app.post('/api/content', async (req, res) => {
  const { question } = req.body;
  console.log("aaaaa...",req.body);
  try {
    const result = await generate(question);
    console.log(result);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while generating content." });
  }
});

app.get('/api/hello', async(res,res) => {
  res.send("heelo fro backend");
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
