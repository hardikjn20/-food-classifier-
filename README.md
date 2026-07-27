# 🍔 Food Quality Classifier - AI-Powered Image Analysis

A modern web application that uses artificial intelligence to analyze food images and classify them as "Good" or "Bad" quality based on freshness, presentation, and visual attributes.

## 🔗 Live Demo

**Live App:** [https://food-classifier-lg6u5fsy8-am-80b6.vercel.app](https://food-classifier-lg6u5fsy8-am-80b6.vercel.app)

## ✨ Features

- 📸 **Image Upload**: Drag-and-drop or click to upload food images
- 🤖 **AI Analysis**: OpenRouter (free vision model) AI-powered classification
- ⚡ **Fast Processing**: Results in seconds
- 🎯 **Detailed Results**: Classification, confidence score, and detailed analysis
- 🎨 **Modern UI**: Beautiful, responsive interface with animations
- 🔒 **Secure**: No data stored, client-side and server-side validation
- 📱 **Mobile-Friendly**: Works on all devices
- 🧪 **Well-Tested**: Comprehensive test suite included

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

**Backend:**
- Node.js
- Next.js API Routes
- Zod (validation)

**AI/ML:**
- OpenRouter API (Free vision-language model)
- Sharp (image processing)

**Testing:**
- Jest
- React Testing Library

**Deployment:**
- Vercel (Recommended)

## 📋 Project Structure

```
food-classifier/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API endpoint for image analysis
│   ├── layout.tsx                 # Root layout component
│   ├── page.tsx                   # Main page with app logic
│   └── globals.css                # Global styles
│
├── components/
│   ├── ImageUploader.tsx           # File upload component
│   ├── LoadingState.tsx            # Loading animation component
│   └── ResultDisplay.tsx           # Results display component
│
├── lib/
│   ├── imageValidation.ts         # File validation logic
│   ├── aiService.ts               # OpenRouter Vision AI integration
│   └── constants.ts               # App constants
│
├── __tests__/
│   ├── imageValidation.test.ts   # Validation tests
│   ├── api.test.ts               # API tests
│   └── components.test.ts        # Component tests
│
├── docs/
│   ├── PRD.md                    # Product Requirement Document
│   └── PROJECT_EXPLANATION.md    # Detailed project explanation
│
├── public/                        # Static assets
├── .env.local.example            # Environment template
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── next.config.js                # Next.js config
├── tailwind.config.js            # Tailwind config
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- **Free OpenRouter API Key** - [Get here](https://openrouter.ai/keys) (No credit card needed!)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-classifier.git
   cd food-classifier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get OpenRouter API Key (COMPLETELY FREE)**
   - Visit: https://openrouter.ai/keys
   - Sign in with Google/GitHub
   - Click "Create Key"
   - Copy the key starting with `sk-or-v1-`

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   - Open `.env.local` and paste your key:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your_key_here
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3001](http://localhost:3001) in your browser
   - Upload a food image and get instant analysis!

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variable: `OPENROUTER_API_KEY`
   - Click "Deploy"

3. **Your app will be live at:** `https://your-project.vercel.app`

## 📝 API Documentation

### POST /api/analyze

Analyzes an uploaded food image.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  ```
  image: File (JPEG, PNG, WebP, or GIF)
  ```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "status": "Good",
    "food_item": "Burger",
    "confidence": "High",
    "reason": "Burger appears fresh with vibrant ingredients and appetizing presentation.",
    "description": "The burger shows a toasted bun, fresh lettuce, and a well-cooked patty with visible grill marks.",
    "health_notes": "Contains fried/processed elements; enjoy in moderation as part of a balanced diet."
  }
}
```

**Response (Error - 400/500):**
```json
{
  "error": "Error message describing the issue"
}
```

## 🎯 Usage Examples

### Test with Sample Images

1. **Good Quality Food:**
   - Fresh burger from restaurant
   - Properly plated pizza
   - Colorful salad with fresh ingredients
   - Well-prepared sandwich

2. **Poor Quality Food:**
   - Burnt or overcooked items
   - Moldy or discolored food
   - Unappealing presentation
   - Spoiled food items

3. **Invalid Files:**
   - PDF documents
   - Text files
   - Non-food images
   - Corrupted image files

## 🔐 File Validation

The application validates files at multiple levels:

1. **Client-side validation:**
   - File type checking
   - File size verification
   - Visual feedback

2. **Server-side validation:**
   - Magic number verification
   - MIME type validation
   - Zod schema validation

3. **Constraints:**
   - Max file size: 10MB
   - Allowed formats: JPEG, PNG, WebP, GIF
   - Minimum dimensions: 100x100px
   - Maximum dimensions: 4000x4000px

## 📊 Test Cases

### Test Scenarios Included

| Scenario | Input | Expected Output |
|----------|-------|-----------------|
| Valid JPEG | Fresh burger image | Classification with confidence |
| Valid PNG | Pizza image | Classification with confidence |
| Invalid type | PDF file | Error: Invalid file type |
| Oversized file | 15MB image | Error: File too large |
| Corrupted file | .jpg with invalid data | Error: Not a valid image |
| Low quality image | Burnt food | "BAD" classification |
| High quality image | Fresh food | "GOOD" classification |

### Running Tests

```bash
# All tests
npm test

# Specific test file
npm test imageValidation.test.ts

# With coverage
npm run test:coverage
```

## 🐛 Troubleshooting

### API Key Errors
**Problem:** "API key not configured"
**Solution:**
1. Check `.env.local` exists
2. Verify `OPENROUTER_API_KEY` is set
3. Restart development server

### Image Upload Fails
**Problem:** "Invalid file format"
**Solution:**
1. Ensure file is actual image (not renamed)
2. Check file size is under 10MB
3. Try different image format

### Build Errors
**Problem:** TypeScript compilation errors
**Solution:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Documentation

- [Product Requirement Document (PRD)](docs/PRD.md) - Complete product specifications
- [Project Explanation](docs/PROJECT_EXPLANATION.md) - Detailed technical and architecture guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This application uses AI for analysis and is for reference purposes only. It should not be used as the sole basis for food safety decisions. Always follow proper food handling standards and visual inspection guidelines.

## 🔗 Links

- [OpenRouter API](https://openrouter.ai/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Deployment](https://vercel.com)

## 📞 Support

For issues or questions:
1. Check [Troubleshooting](#-troubleshooting) section
2. Review [Project Explanation](docs/PROJECT_EXPLANATION.md)
3. Check existing GitHub issues
4. Create a new issue with details

---

**Made with ❤️ for Bizbytech**
