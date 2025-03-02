require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const puppeteer = require("puppeteer");
const OpenAI = require("openai");
const translate = require("google-translate-api-x").default;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS) from the same directory
app.use(express.static(__dirname));

// Route to serve index.html when visiting the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file contains OPENAI_API_KEY
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

    // 🤖 Send to OpenAI GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: translatedInput }],
    });

    // 🌍 Translate AI’s response back to the user's language
    const translatedResponse = await translate(completion.choices[0].message.content, { to: userLang });

    res.json({ reply: translatedResponse.text });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Something went wrong with the chatbot." });
  }
});

// Web Browsing API Endpoint
app.post("/browse", async (req, res) => {
  const { url } = req.body;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract visible text from the page
    const content = await page.evaluate(() => document.body.innerText);
    
    res.json({ content: content.substring(0, 1000) }); // Limit response size
  } catch (error) {
    console.error("Browsing Error:", error);
    res.status(500).json({ error: "Failed to browse the website." });
  } finally {
    if (browser) await browser.close();
  }
});

// Web Scraping with Puppeteer
app.post("/scrape", async (req, res) => {
  const { url } = req.body;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const content = await page.evaluate(() => document.body.innerText);
    
    res.json({ content: content.substring(0, 1000) }); // Limit response size
  } catch (error) {
    console.error("Scraping Error:", error);
    res.status(500).json({ error: "Failed to scrape the website." });
  } finally {
    if (browser) await browser.close();
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
    console.error("Search API Error:", error);
    res.status(500).json({ error: "Failed to fetch search results." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


