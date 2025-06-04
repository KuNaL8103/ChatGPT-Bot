# ChatGPT Bot

A simple ChatBot built using **JavaScript** and powered by **Google Gemini API**. You can ask anything, and it will respond just like ChatGPT – but now with Gemini!

> 💡 **You can also use other APIs like ChatGPT, Claude, or Mistral by adjusting the URL and request body accordingly.**

---

## 🚀 Features

- Ask anything via a simple interface  
- Powered by Gemini 1.5 Flash (latest)  
- Responsive UI  
- Handles API errors gracefully  

---

## 🔧 Setup

To use this bot, you'll need your own **Gemini API key**.

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and generate your Gemini API key.
2. Replace the placeholder in your JavaScript code:

```javascript
// Replace with your actual Gemini API key
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
