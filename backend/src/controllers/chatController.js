const Chat = require('../models/Chat');
require('dotenv').config();

const GROQ_MODELS = [
  "llama-3.3-70b-versatile",
  "deepseek-r1-distill-llama-70b",
  "mixtral-8x7b-32768",
];

async function callAI(prompt) {
  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            max_tokens: 4096,
          }),
        }
      );

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errBody}`);
      }

      const data = await response.json();

      if (data.choices?.[0]?.message?.content) {
        console.log(`✅ Success with model: ${model}`);
        return {
          result: data.choices[0].message.content,
          modelUsed: model,
        };
      }
    } catch (err) {
      console.warn(`Model ${model} failed:`, err.message);
    }
  }
  throw new Error("All models failed. Please try again.");
}

const detectRequestType = (message) => {
  const keywords = ['landing page', 'webpage', 'website', 'html page', 'ui page', 'web page', 'homepage', 'portfolio page', 'signup page', 'login page', 'form page'];
  const lowerMsg = message.toLowerCase();
  return keywords.some(keyword => lowerMsg.includes(keyword));
};

const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    let { message, language } = req.body;
    let conversationType;

    // Unpack nested message object
    if (typeof message === 'object' && message !== null) {
      conversationType = message.conversationType;
      language = message.language || language;
      message = message.message;
    }

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const isUIRequest = detectRequestType(message);
    let prompt;

    if (conversationType === 'chat') {
      prompt = `You are DevMind AI, a helpful and friendly AI assistant.
Answer any question the user asks clearly and helpfully.
You can answer coding questions, general knowledge, 
career advice, tech explanations, or anything else.

Rules:
- Be conversational and friendly
- Use markdown formatting
- Use code blocks only when showing code examples
- Keep answers concise but complete
- If asked about code, explain clearly with examples

User message: ${message}`;
    } else if (conversationType === 'debug') {
      prompt = `Please debug the following ${language || 'JavaScript'} code. Identify any bugs, explain why they occur, and provide the fixed code.
When listing bugs, wrap each bug description with ❌ at the start. When showing fixed lines wrap with ✅.
This helps users identify issues quickly.

\`\`\`${language || 'JavaScript'}
${message}
\`\`\``;
    } else if (conversationType === 'code' || isUIRequest) {
      if (isUIRequest) {
        prompt = `You are DevMind AI, an expert frontend developer.
Create a complete single-file HTML page.

STRICT OUTPUT RULES:
- Return ONE code block only
- Single HTML file: HTML + CSS + JS all together
- CSS inside <style> tag in <head>
- JS inside <script> tag before </body>
- Zero text outside the code block
- Zero explanations
- Zero multiple files
- Code must be complete, never cut off midway

DESIGN RULES:
- Google Fonts: @import Poppins or Inter in style tag
- Modern professional design
- Real content not lorem ipsum
- Sticky navbar with smooth scroll
- Hero with gradient background and CTA button
- All sections fully styled
- Hover effects on buttons and cards
- CSS animations: fadeIn on hero, slideUp on sections
- Mobile responsive with media queries
- Max 4 sections to keep code within limits

SECTIONS TO BUILD based on user request:
- Navbar (always include)
- Hero section (always include)  
- 2 more sections based on request
- Footer (always include)

User request: ${message}

OUTPUT FORMAT:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
... complete code here ...
</html>
\`\`\``;
      } else {
        prompt = `You are DevMind AI, an expert ${language || 'JavaScript'} developer 
and coding assistant.

STRICT RULES:
- Write clean, production-ready code
- Follow best practices and design patterns
- Add helpful comments explaining key parts
- Include error handling where needed
- If writing a function, include example usage
- Use proper ${language || 'JavaScript'} conventions
- Return complete working code
- Brief explanation after the code only

User request: ${message}`;
      }
    } else {
      prompt = `You are DevMind AI, a helpful AI assistant.
Answer the user's question clearly and helpfully.
Use markdown formatting. Be friendly and concise.

User message: ${message}`;
    }

    const aiResponse = await callAI(prompt);

    const title = message.substring(0, 30) + (message.length > 30 ? '...' : '');

    const chat = new Chat({
      userId,
      title,
      language: language || 'JavaScript',
      messages: [
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse.result }
      ]
    });

    await chat.save();

    res.status(201).json({ chat, modelUsed: aiResponse.modelUsed });
  } catch (error) {
    console.error('createChat error:', error);
    res.status(500).json({ message: 'Server error creating chat' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const chatId = req.params.id;
    let { message } = req.body;
    let conversationType;
    const userId = req.user._id;

    if (typeof message === 'object' && message !== null) {
      conversationType = message.conversationType;
      message = message.message;
    }

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const context = chat.messages.slice(-6).map(m => `${m.role}: ${m.content}`).join("\n");

    const fullPrompt = `You are DevMind AI, an expert coding assistant.
Previous conversation:
${context}
New message: ${message}
Provide a clear, structured response using markdown.`;

    const aiResponse = await callAI(fullPrompt);

    chat.messages.push({ role: 'user', content: message });
    chat.messages.push({ role: 'assistant', content: aiResponse.result });
    chat.updatedAt = Date.now();

    await chat.save();

    res.status(200).json({ chat, modelUsed: aiResponse.modelUsed });
  } catch (error) {
    console.error('sendMessage error:', error);
    res.status(500).json({ message: 'Server error sending message' });
  }
};

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .select('-messages')
      .sort({ updatedAt: -1 });
    res.status(200).json({ chats });
  } catch (error) {
    console.error('getAllChats error:', error);
    res.status(500).json({ message: 'Server error fetching chats' });
  }
};

const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    console.error('getChatById error:', error);
    res.status(500).json({ message: 'Server error fetching chat' });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error('deleteChat error:', error);
    res.status(500).json({ message: 'Server error deleting chat' });
  }
};

module.exports = { createChat, sendMessage, getAllChats, getChatById, deleteChat };