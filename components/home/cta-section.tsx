import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise opacity-20" aria-hidden="true" />
      <div className="relative py-12 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[32px] px-6 sm:px-10 py-10 shadow-2xl text-center text-slate-900 bg-white/85">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Cut your reading time in half — and look great doing it.
            </h2>
            <p className="mx-auto max-w-[720px] text-slate-600 md:text-lg/relaxed">
              Give SummizeDoc a PDF and get back a crisp summary, follow-up steps, and a shareable story your team will actually read.
            </p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size={"lg"}
              variant={"link"}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-700 hover:to-indigo-500 hover:text-white text-white transition-all duration-300 rounded-full px-8"
            >
              <Link
                href="/#pricing"
                className="flex items-center justify-center w-full"
              >
                Get started now
                <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
              </Link>
            </Button>
            <Link
              href="/upload"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/60 bg-white/70 px-6 py-3 text-base font-semibold text-slate-800 shadow-lg shadow-indigo-100 hover:-translate-y-0.5 transition"
            >
              Upload a PDF
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
