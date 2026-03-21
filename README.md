# The Envelope - Oscars AI Chatbot

A specialized conversational AI trained to be an expert on the Academy Awards. Built for the Thinkly Labs - Software Engineering assignment.

## Features
- **Purpose-Built UI**: Reflects the elegance and dark-mode aesthetic of the Oscars. 
- **Responsive Layout**: Includes a sidebar for navigation and a main chat area designed for desktop and mobile views.
- **Gemini Powered**: Integrated with `@google/generative-ai` to serve intelligent, historically accurate responses regarding movies, actors, directors, and the Academy Awards.
- **Graceful Error Handling**: Implements the "Unavailable" state when API limits are reached or the backend is disconnected.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Vanilla CSS Modules with custom design tokens (Gold, Off-White, Neutral Black)
- **AI Model**: Google Gemini (gemini-2.5-flash)
- **Icons**: Lucide React

## Local Development

Ensure you have Node.js installed, then run the following:

```bash
# Install dependencies
npm install

# Set up your environment variables
# Create a .env.local file in the root
GEMINI_API_KEY=your_api_key_here

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design Decisions
- Opted for Vanilla CSS instead of Tailwind to demonstrate raw CSS architectural skills and control over CSS variables.
- Structured the application with clear separation between UI components and API handlers.
- The UI incorporates a visually engaging dark mode theme with radial gradients to emphasize the premium "Oscars" feel.
