### ChatGPT Bot
Used RapidAPI to code a ChatGPT bot with Javascript. A project that you can ask anything from ChatGPT with Javascript❗️
You can also use official ChatGPT api in this bot too.

## Warning
You need to get your own API key and replace the headers and URL section in index.js file and also if there is a model for a different API then modify the body section also in the code :

```javascript
'content-type': 'application/json',
'X-RapidAPI-Key': 'Your Key',
'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
```
```javascript
body: `{"model" = "model name", "messages":[{"role":"user","content":"${message}"}]}`
```

# Screenshot
Here is the project screenshot :

![screenshot](screenshot.jpg)
