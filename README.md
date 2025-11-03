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

## 🎨 Customization

### Changing Colors
The app uses a blue/purple color scheme. To modify:
- Primary colors: Edit Tailwind classes (purple-500, blue-600, indigo-600)
- CSS variables: Update `app/globals.css` theme colors
- Component themes: Modify color utility classes in component files

### Adding New Features
1. Create new components in `/components`
2. Add server actions in `/helper` directory
3. Create API routes in `/app/api`
4. Update database schema and run migrations

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

## 🐛 Troubleshooting

### Common Issues

**Module not found error for `@langchain/community`**
```bash
npm install @langchain/community --legacy-peer-deps
npm install pdf-parse@1.1.1
```

**Database connection errors**
- Verify `DATABASE_URL` in `.env.local`
- Ensure Neon database is accessible
- Check network firewall settings

**PDF upload fails**
- Maximum file size is 20MB
- Only PDF files are supported
- Ensure UploadThing credentials are correct

**Summaries not generating**
- Verify Google Gemini API key is valid
- Check API quota and rate limits
- Review server logs for detailed errors

## 📈 Performance Optimization

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Server-side caching for summaries
- **Database Indexing**: Optimized queries with proper indexes
- **Vector Search**: Fast semantic search using pgvector

## 🔒 Security

- **Authentication**: Secure JWT tokens via Clerk
- **Database**: Encrypted connections to Neon
- **API**: Server-side validation and rate limiting
- **Payments**: PCI-compliant Stripe integration
- **Environment**: Sensitive keys stored securely

## 📝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

- 📧 Email: support@summizedoc.com
- 💬 Discord: [Join our community](https://discord.gg/summizedoc)
- 🐛 Issues: [GitHub Issues](https://github.com/Rahulkanyalgith/SummizeDoc/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Clerk](https://clerk.com) - Authentication
- [Google Gemini](https://gemini.google.com) - AI models
- [Neon](https://neon.tech) - Database hosting
- [UploadThing](https://uploadthing.com) - File uploads
- [Shadcn/ui](https://shadcn-ui.com) - UI components

---

**Made with ❤️ by the SummizeDoc team**
