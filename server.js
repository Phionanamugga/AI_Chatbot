require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const puppeteer = require("puppeteer");
const { Configuration, OpenAIApi } = require("openai");
const translate = require("google-translate-api-x").default;

const app = express();
app.use(express.json());
app.use(cors());

// OpenAI Configuration
const OpenAI = require("openai"); // ✅ Correct import for OpenAI v4

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have a .env file with the API key
});

// Chatbot API Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // 🔍 Detect the language
    const detected = await translate(message, { to: "en" });
    const userLang = detected.from.language.iso;

    // 🌍 Translate to English before sending to OpenAI
    const translatedInput = detected.text;

    // 🤖 Send to OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: translatedInput }],
    });

    // 🌍 Translate AI’s response back to the user’s language
    const translatedResponse = await translate(completion.data.choices[0].message.content, { to: userLang });

    res.json({ reply: translatedResponse.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Web Browsing API Endpoint
app.post("/browse", async (req, res) => {
  try {
    const { url } = req.body;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract the visible text from the page
    const content = await page.evaluate(() => document.body.innerText);
    await browser.close(); // Close the browser

    res.json({ content: content.substring(0, 1000) }); // Limit response size
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Web Scraping with Puppeteer
app.post("/scrape", async (req, res) => {
  try {
    const { url } = req.body;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const content = await page.evaluate(() => document.body.innerText);
    await browser.close();
    
    res.json({ content: content.substring(0, 1000) }); // Limit response size
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google Search with SerpAPI
app.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    const apiKey = process.env.SERPAPI_KEY;
    
    const response = await axios.get("https://serpapi.com/search", {
      params: { q: query, api_key: apiKey },
    });

    res.json({ results: response.data.organic_results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


