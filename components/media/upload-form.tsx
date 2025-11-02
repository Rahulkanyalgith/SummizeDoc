"use client";

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";
import { useAuth, useUser } from "@clerk/nextjs";
//schema with zod

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB",
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF",
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [freeLimitReached, setFreeLimitReached] = useState(false);
  const [isCheckingPlan, setIsCheckingPlan] = useState(true);
  const router = useRouter();
  const { userId } = useAuth();
  const { user } = useUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    undefined;

  // Check user plan and free usage count on mount
  useEffect(() => {
    async function checkUserPlan() {
      if (!email) {
        setIsCheckingPlan(false);
        return;
      }

      try {
        // Fetch user's plan from the database
        const response = await fetch("/api/user/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const { planId } = await response.json();

          // Only check localStorage for Free plan users
          if (planId === "free") {
            const usage = parseInt(
              localStorage.getItem("free_upload_count") || "0",
              10,
            );
            if (usage >= 4) {
              setFreeLimitReached(true);
            }
          } else {
            // Basic and Pro users can always upload
            setFreeLimitReached(false);
          }
        } else {
          // If API fails, fallback to localStorage check
          const usage = parseInt(
            localStorage.getItem("free_upload_count") || "0",
            10,
          );
          if (usage >= 2) {
            setFreeLimitReached(true);
          }
        }
      } catch (error) {
        console.error("Error checking user plan:", error);
        // Fallback to localStorage check
        const usage = parseInt(
          localStorage.getItem("free_upload_count") || "0",
          10,
        );
        if (usage >= 2) {
          setFreeLimitReached(true);
        }
      } finally {
        setIsCheckingPlan(false);
      }
    }

    checkUserPlan();
  }, [email]);

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast(" Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: (data) => {
      console.log("upload has begun for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if user is on Free plan and has reached limit
    if (freeLimitReached) {
      toast(
        "You have reached the free usage limit. Please upgrade to continue.",
        { style: { color: "red" } },
      );
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validating the fields
      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast("❌ Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file.",
          style: { color: "red" },
        });
        setIsLoading(false);
        return;
      }

      toast("📄 Uploading PDF...", {
        description: "We are uploading your PDF! ",
      });

      //upload the file to the uploadthing

      const uploadResponse = await startUpload([file]);
      if (!uploadResponse) {
        toast("Something went wrong", {
          description: "Please use a different file",
          style: { color: "red" },
        });
        setIsLoading(false);
        return;
      }

      toast("⏳ Processing PDF...", {
        description: "Hang tight! Our AI is reading through your document! ✨",
      });

      const uploadFileUrl = uploadResponse[0].serverData.fileUrl;

      //parse the pdf using lang chain
      const result = await generatePdfSummary({
        fileUrl: uploadFileUrl,
        fileName: file.name,
      });

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;

        toast("💾 Saving PDF...", {
          description: "Hang tight! We are saving your summary! ✨",
        });

        if (data.summary) {
          // save the summary to the database
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: uploadFileUrl,
            title: data.title,
            fileName: file.name,
            userId: userId || undefined, // ensure string or undefined
            email, // pass real email
          });

          // Only increment localStorage for Free plan users
          const response = await fetch("/api/user/plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

          if (response.ok) {
            const { planId } = await response.json();
            if (planId === "free") {
              // Increment free usage count only for Free users
              const usage = parseInt(
                localStorage.getItem("free_upload_count") || "0",
                10,
              );
              localStorage.setItem("free_upload_count", (usage + 1).toString());
            }
          }

          toast("✨ Summary Generated!", {
            description:
              "Your summary has been successfully summarized and saved",
          });

          formRef.current?.reset();
          router.push(`/dashboard`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("error occurred", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingPlan) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (freeLimitReached) {
    return (
      <div className="text-center text-rose-600 font-bold text-lg">
        You have reached your free usage limit. Please upgrade to continue.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>

      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>

          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
