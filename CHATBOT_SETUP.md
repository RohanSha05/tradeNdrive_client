# Chatbot Setup Guide

## Using DeepSeek API

The chatbot now uses DeepSeek's API for AI-powered conversations. Here's how to set it up:

### 1. Get Your DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key

### 2. Configure the Environment

1. Create a `.env` file in the root directory:
```bash
VITE_DEEPSEEK_API_KEY=your_actual_api_key_here
```

2. Make sure `.env` is in your `.gitignore` to keep your API key secure

### 3. Features

- **Simple & Clean Interface**: Modern chat UI with smooth animations
- **Real-time Conversations**: Powered by DeepSeek's AI model
- **Auto Assistant**: Specialized for automotive inquiries
- **Responsive Design**: Works on mobile and desktop

### 4. Testing

1. Start your development server:
```bash
npm run dev
```

2. Click the chat icon (💬) in the bottom-right corner
3. Start chatting!

### 5. Customization

You can customize the chatbot behavior by editing:
- **System Prompt**: In `Chatbot.jsx`, modify the system message
- **Styling**: Edit `Chatbot.css` for appearance changes
- **Model Settings**: Adjust `temperature` and `max_tokens` in the API call

### Troubleshooting

- **"API key not configured"**: Make sure your `.env` file exists and has the correct variable name
- **Connection errors**: Check your internet connection and API key validity
- **Rate limits**: DeepSeek has usage limits; check your account dashboard

### Alternative: Free Testing Mode

For testing without an API key, you can temporarily modify the code to use a mock response. This is useful for UI development.
