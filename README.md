# 📄 SummizeDoc - AI-Powered PDF Summarizer

Transform your lengthy PDFs into concise, actionable summaries in seconds! SummizeDoc uses cutting-edge AI technology to extract key insights from your documents, saving you time and helping you focus on what matters most.

## ✨ Features

- **🤖 AI-Powered Summaries**: Automatically generate intelligent summaries of PDF documents using advanced AI models (Gemini)
- **⚡ Lightning-Fast Processing**: Get summaries in seconds, not hours
- **📊 Interactive Summary Viewer**: Beautiful, easy-to-read summary cards with emoji-highlighted key points
- **🔐 Secure Authentication**: User authentication powered by Clerk
- **💰 Flexible Pricing Plans**: 
  - **Free**: 4 uploads per month
  - **Basic**: Unlimited uploads with advanced features
  - **Pro**: Premium support and priority processing
- **💾 Summary Management**: Save, download, and organize all your summaries in your dashboard
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Beautiful gradient-based design with smooth animations using Framer Motion

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.1 (with Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/ui (Radix UI based)
- **Animations**: Framer Motion
- **Authentication**: Clerk

### Backend & Services
- **Database**: Neon PostgreSQL with pgvector support
- **AI/ML**: Google Gemini API
- **PDF Processing**: LangChain (@langchain/community)
- **File Upload**: UploadThing
- **Payments**: Stripe integration
- **Vector Embeddings**: pgvector for semantic search

### Development Tools
- **Code Quality**: ESLint
- **CSS Processing**: PostCSS
- **Styling Plugins**: TailwindCSS plugins

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed
- PostgreSQL database (Neon recommended)
- Clerk authentication account
- Google Gemini API key
- Stripe account (for payments)
- UploadThing account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rahulkanyalgith/SummizeDoc.git
   cd ai-pdf-reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=your_neon_postgres_url

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret

   # Google Gemini API
   GOOGLE_API_KEY=your_gemini_api_key

   # UploadThing
   UPLOADTHING_TOKEN=your_uploadthing_token

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   NEXT_PUBLIC_BASIC_PLAN_PRICE_ID=your_basic_price_id
   NEXT_PUBLIC_PRO_PLAN_PRICE_ID=your_pro_price_id
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application

## 📖 Usage

### For Users
1. **Sign Up**: Create an account using email or social login
2. **Upload PDF**: Go to the upload page and select your PDF file (max 20MB)
3. **Wait for Processing**: Our AI analyzes your document (typically 10-30 seconds)
4. **View Summary**: Browse your beautifully formatted summary with key points highlighted
5. **Manage Summaries**: Download, view details, or delete summaries from your dashboard
6. **Upgrade**: Choose a plan to unlock unlimited uploads and advanced features

### For Developers

#### Key Directories
- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Core business logic (database, AI, payment handling)
- `/utils` - Helper functions and constants
- `/public` - Static assets

#### Important Files
- `lib/langchain.ts` - PDF text extraction and chunking
- `lib/gemini-ai.ts` - AI summary generation
- `lib/db.ts` - Database connection and queries
- `lib/payments.ts` - Stripe payment integration
- `app/api/uploads/route.ts` - PDF upload handler
- `app/api/payments/route.ts` - Payment webhook handler

## 🔄 API Routes

### Public Routes
- `GET /` - Landing page
- `GET /signin` - Sign in page
- `GET /signup` - Sign up page

### Protected Routes (Requires Authentication)
- `GET /dashboard` - User summaries dashboard
- `GET /summary/[id]` - View individual summary
- `POST /upload` - Upload PDF page
- `GET /api/user/plan` - Get user's current plan
- `POST /api/uploads/core` - Process PDF upload
- `GET /api/uploads` - Retrieve uploaded files
- `POST /api/payments` - Handle payment webhooks




## 🚢 Deployment

### Deploy on Vercel (Recommended)
```bash
npm run build
# Then push to GitHub and connect to Vercel
```

### Manual Deployment
1. Build the project: `npm run build`
2. Start production server: `npm run start`
3. Set all environment variables on your hosting platform

## 📊 Database Schema

### Key Tables
- **users** - User profiles with subscription info
- **summaries** - Stored PDF summaries
- **subscriptions** - User subscription records
- **documents** - Original PDF document references



**PDF upload fails**
- Maximum file size is 20MB
- Only PDF files are supported
- Ensure UploadThing credentials are correct




**Made with ❤️ by the SummizeDoc team**
