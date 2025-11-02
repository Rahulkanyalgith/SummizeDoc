"use client";
import { useEffect, useState } from "react";
import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import UploadForm from "@/components/media/upload-form";
import UploadHeader from "@/components/media/upload-header";
import UpgradeRequired from "@/components/common/upgrade-required";
import { containerVariants } from "@/utils/constants";
import { useUser } from "@clerk/nextjs";

export default function UploadPage() {
  const [freeLimitReached, setFreeLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function checkUserPlan() {
      if (!user?.primaryEmailAddress?.emailAddress) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user's plan from the database
        const response = await fetch("/api/user/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
          }),
        });

        if (response.ok) {
          const { planId } = await response.json();

          // Only check localStorage for Free plan users
          if (planId === "free") {
            const usage = parseInt(
              localStorage.getItem("free_upload_count") || "0",
              10,
            );
            if (usage >= 2) {
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
        setIsLoading(false);
      }
    }

    checkUserPlan();
  }, [user]);

  if (isLoading) {
    return (
      <section className="min-h-screen">
        <BgGradient />
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        >
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <UploadHeader />
            <div className="text-gray-600">Loading...</div>
          </div>
        </MotionDiv>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          {freeLimitReached ? <UpgradeRequired /> : <UploadForm />}
        </div>
      </MotionDiv>
    </section>
  );
}
