import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptySummaryState() {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />

        <h2 className="text-xl font-semibold text-gray-600">
          No summaries yet
        </h2>
        <p className="text-gray-500 max-w-md">
          Upload your first PDF to get started with AI-powered summaries.
        </p>
        <Link href={"/upload"}>
          <Button
            variant={"link"}
            className="mt-4 text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300 group hover:no-underline"
          >
            Create your first summary
          </Button>
        </Link>
      </div>
    </div>
  );
}
