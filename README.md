# Icon Recommender 🎨

An AI-powered icon recommendation tool that helps developers and designers find the perfect icons for their projects. Simply describe what you need in natural language, and get intelligent, curated suggestions from multiple popular icon libraries with real-time validation.

![Icon Recommender](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

- **🤖 AI-Powered Recommendations**: Uses GLM-4.5-Flash model to understand your requirements and suggest contextually relevant icons
- **📚 5 Popular Icon Libraries**: Comprehensive support for:
  - [IconPark](https://iconpark.oceanengine.com/) - Modern and versatile icons with theme support
  - [Font Awesome](https://fontawesome.com/) - The web's most popular icon set (7.0.1)
  - [Ant Design Icons](https://ant.design/components/icon/) - Beautiful icons from Ant Design system
  - [Heroicons](https://heroicons.com/) - Clean SVG icons by Tailwind CSS creators
  - [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- **🔍 Real-time Icon Validation**: Automatically filters out invalid icon names and shows only available icons
- **📋 Smart Copy Functions**: One-click copying of icon names and ready-to-use React code snippets
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI**: Built with shadcn/ui components and Tailwind CSS 4
- **⚡ Fast Performance**: Next.js 15 with App Router and Turbopack for lightning-fast development
- **🔧 Extensible**: Easy to add new icon libraries and customize recommendations
- **🏷️ Tech Stack Display**: Header showcasing the project's technology stack with direct links to documentation

## 🚀 Demo

**Live Demo:** [icon-recommender.vercel.app](https://icon-recommender.vercel.app)

### How it works:

1. **Describe your needs** in natural language
2. **AI analyzes** your requirements using advanced language understanding
3. **Get curated suggestions** from 5 icon libraries with explanations
4. **Copy and use** icon names or React code snippets instantly

### Example queries:

- "I need an icon for a delete button in my mobile app"
- "Looking for icons for a user profile section"
- "Need icons for a shopping cart feature"
- "Icons for file upload functionality"
- "Social media sharing buttons"

The AI provides context-aware recommendations with detailed explanations for why each icon fits your specific needs.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router & Turbopack
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Runtime**: [React 19.1.0](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Icon Libraries**:
  - [IconPark](https://iconpark.oceanengine.com/) (v1.4.2)
  - [Font Awesome](https://fontawesome.com/) (v7.0.1)
  - [Ant Design Icons](https://ant.design/components/icon/) (v5.6.1)
  - [Heroicons](https://heroicons.com/) (v2.2.0)
  - [Lucide React](https://lucide.dev/) (v0.542.0)
- **AI Model**: GLM-4.5-Flash for intelligent icon recommendations
- **Development**: ESLint 9 for code quality

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alen-hh/icon-recommender.git
   cd icon-recommender
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**

   For local development, create a `.env.local` file:

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` with your GLM API credentials:

   ```bash
   GLM_API_TOKEN=your-glm-api-token-here
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

### Environment Setup

The application requires a GLM API token for AI-powered recommendations. Set up your environment variables:

**For Local Development:**
Create a `.env.local` file:

```bash
GLM_API_TOKEN=your-glm-api-token-here
```

**For Production (Vercel):**
Add the environment variable in your Vercel dashboard under Project Settings > Environment Variables.

### Customizing AI Behavior

The application uses a system prompt from `public/system-prompt.md` to guide the AI's icon recommendations. You can customize this prompt to:

- Adjust recommendation criteria
- Change the response format
- Add specific guidelines for your use case
- Modify the number of recommendations per library

## 🎯 Usage

### Basic Workflow

1. **Describe your needs**: Enter a detailed description of what kind of icon you need
2. **Get AI recommendations**: Click "Get Recommendations" or press `Cmd+Enter`
3. **Review suggestions**: Browse AI-curated icons from multiple libraries with explanations
4. **Copy and implement**: Use copy buttons to get icon names or ready-to-use React code

### Best Practices for Descriptions

- Be specific about the context (e.g., "mobile app delete button" vs "delete")
- Mention the use case (e.g., "user profile", "shopping cart", "file upload")
- Include style preferences if any (e.g., "minimalist", "outlined", "filled")
- Specify the action or function (e.g., "save", "edit", "share", "download")

### Icon Output Formats

- **Icon Name**: Copy the exact icon name for manual implementation
- **React Code**: Copy ready-to-use JSX with proper imports and props

## 📁 Project Structure

```
icon-recommender/
├── app/                    # Next.js 15 App Router
│   ├── api/
│   │   └── recommend/
│   │       └── route.ts   # API endpoint for AI recommendations
│   ├── globals.css        # Global Tailwind styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main application page
│   └── favicon.ico        # App favicon
├── components/            # Reusable React components
│   └── ui/               # shadcn/ui components
│       ├── button.tsx    # Button component
│       ├── card.tsx      # Card component
│       └── textarea.tsx  # Textarea component
├── lib/                  # Utility libraries
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   ├── icons/
│   │   └── iconpark.json # IconPark icon data
│   └── system-prompt.md  # AI system prompt template
├── env.example           # Environment variables template
├── components.json       # shadcn/ui configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── next.config.ts        # Next.js configuration
```

## 🤝 Contributing

Contributions are welcome! Whether it's adding new icon libraries, improving AI recommendations, or enhancing the UI, we'd love your help.

### Development Setup

1. Fork the project
2. Clone your fork: `git clone https://github.com/your-username/icon-recommender.git`
3. Install dependencies: `npm install`
4. Set up your `.env.local` with API credentials (copy from `env.example`)
5. Start development server: `npm run dev`

### Contribution Guidelines

1. Create your feature branch (`git checkout -b feature/amazing-feature`)
2. Make your changes with proper TypeScript typing
3. Test your changes thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request with a clear description

### Areas for Contribution

- **New Icon Libraries**: Add support for additional icon sets
- **AI Improvements**: Enhance the recommendation algorithm
- **UI/UX**: Improve the user interface and experience
- **Performance**: Optimize icon loading and validation
- **Documentation**: Improve README, code comments, and guides

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Icon Libraries**:
  - [IconPark](https://iconpark.oceanengine.com/) - Modern and versatile icons from ByteDance
  - [Font Awesome](https://fontawesome.com/) - The web's most popular icon set
  - [Ant Design](https://ant.design/) - Design system and icons from Ant Group
  - [Heroicons](https://heroicons.com/) - Clean SVG icons by Tailwind CSS creators
  - [Lucide](https://lucide.dev/) - Beautiful icon toolkit forked from Feather Icons
- **Technology Stack**:
  - [Next.js](https://nextjs.org/) - React framework for production
  - [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed UI components
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [GLM API](https://open.bigmodel.cn/) - AI model for intelligent recommendations
  - [Vercel](https://vercel.com/) - Deployment and hosting platform

## 🚀 Deployment

The application is optimized for Vercel deployment:

```bash
npm run build    # Build for production
npm start        # Start production server
```

### Environment Variables

Add these environment variables in your Vercel dashboard:

- `GLM_API_TOKEN`: Your GLM API token for AI recommendations (required)
- `GLM_API_URL`: GLM API endpoint (optional, defaults to https://open.bigmodel.cn/api/paas/v4/chat/completions)

## 🐛 Issues & Support

If you encounter any issues or have questions:

- [Open an issue](https://github.com/alen-hh/icon-recommender/issues) on GitHub
- Check existing issues for solutions
- Provide detailed reproduction steps for bugs

---

Made with ❤️ by [alen-hh](https://github.com/alen-hh) | Powered by AI
