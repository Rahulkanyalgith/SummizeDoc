import Link from "next/link";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-rose-600" />
          <span className="font-bold text-lg text-gray-900">ConciseDocs</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 text-gray-600 text-sm">
          <Link href="/" className="hover:text-rose-600 transition">
            Home
          </Link>
          <Link href="/#pricing" className="hover:text-rose-600 transition">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:text-rose-600 transition">
            Dashboard
          </Link>
          <Link href="/upload" className="hover:text-rose-600 transition">
            Upload
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          &copy; 2025 Krishna All rights reserved.
        </div>
      </div>
    </footer>
  );
}
