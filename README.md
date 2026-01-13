# ResumeCraft

A modern, AI-powered resume builder application built with Next.js and Firebase. Create professional resumes with real-time preview, AI-powered suggestions, and customizable templates.

## ✨ Features

- **📝 User-Friendly Interface**: Intuitive form-based resume creation with structured input fields
- **👁️ Live Preview**: Real-time preview of your resume as you type
- **🤖 AI-Powered Enhancement**: Get intelligent suggestions to improve your resume using Google's Gemini AI
- **🎨 Customizable Formatting**: 
  - Adjustable font size (10-20px)
  - Text alignment options (left, center, right, justify)
- **📄 PDF Export**: Download your resume as a PDF with a single click (print to PDF)
- **🔧 Flexible Sections**:
  - Personal Information
  - Professional Summary
  - Work Experience
  - Education
  - Custom Sections (with list, grid, or paragraph layouts)
- **💅 Modern UI**: Built with shadcn/ui components and Tailwind CSS for a clean, professional look

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **AI Integration**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google AI (Gemini 2.0 Flash)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Hosting**: Firebase App Hosting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher
- **npm**: Version 7 or higher (comes with Node.js)
- **Google AI API Key**: For AI-powered resume enhancement features

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shrishesha4/resume-studio.git
cd resume-studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Google AI API key:

```env
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
```

> **Note**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 📜 Available Scripts

- **`npm run dev`**: Start the development server with Turbopack on port 9002
- **`npm run build`**: Build the application for production
- **`npm start`**: Start the production server
- **`npm run lint`**: Run ESLint to check code quality
- **`npm run typecheck`**: Run TypeScript type checking
- **`npm run genkit:dev`**: Start Genkit development server
- **`npm run genkit:watch`**: Start Genkit development server with watch mode

## 📁 Project Structure

```
resume-studio/
├── src/
│   ├── ai/                  # AI-related functionality
│   │   ├── flows/          # Genkit AI flows
│   │   │   └── suggest-resume-improvements.ts
│   │   ├── genkit.ts       # Genkit configuration
│   │   └── dev.ts          # Genkit development server
│   ├── app/                # Next.js app directory
│   │   ├── page.tsx        # Main application page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── resume-form.tsx # Resume input form
│   │   ├── resume-preview.tsx # Live resume preview
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and types
│   │   ├── types.ts       # TypeScript types and Zod schemas
│   │   ├── actions.ts     # Server actions
│   │   └── utils.ts       # Utility functions
├── docs/
│   └── blueprint.md       # Original project blueprint
├── public/                # Static files
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── components.json        # shadcn/ui configuration
└── package.json          # Project dependencies
```

## 🎯 Usage

1. **Enter Personal Information**: Fill in your name, email, phone, and LinkedIn profile
2. **Add Summary**: Write a professional summary about yourself
3. **Add Experience**: Include your work history with descriptions
4. **Add Education**: List your educational background
5. **Add Custom Sections**: Create additional sections for skills, certifications, etc.
6. **Customize Formatting**: Adjust font size and text alignment to your preference
7. **Enhance with AI**: Click "Enhance with AI" to get intelligent suggestions for improving your resume
8. **Download**: Click "Download PDF" to export your resume

## 🤖 AI Enhancement

The AI enhancement feature uses Google's Gemini 2.0 Flash model to:

- Analyze your resume content
- Provide specific improvement suggestions
- Generate an improved version of your resume
- Offer insights based on resume best practices

## 🎨 Customization

### Custom Sections

You can add custom sections with three layout options:

- **List**: Bullet-point style list
- **Grid**: Multi-column grid layout (configurable columns and rows)
- **Paragraph**: Free-form paragraph text

### Styling

The application uses a minimalist design with:

- Primary Color: Neutral tones for a professional look
- Font: Inter (grotesque sans-serif)
- Clean sections with clear visual hierarchy

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENAI_API_KEY` | Google AI API key for AI enhancement features | Yes |

## 🚢 Deployment

This project is configured for deployment on Firebase App Hosting. The `apphosting.yaml` file contains the deployment configuration.

To deploy:

1. Ensure you have Firebase CLI installed
2. Configure your Firebase project
3. Run the deployment command through Firebase App Hosting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) component library
- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
- Deployed on [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
