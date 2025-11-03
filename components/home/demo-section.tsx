import { FileText } from "lucide-react";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import { SummaryViewer } from "../summary/summary-viewer";

const DEMO_SUMMARY = `
🌟 AI is Revolutionizing Fitness & Health! 🏋️‍♂️🤖
  🌟 AI is Completely Transforming the World of Fitness & Health! 🏋️‍♂️🤖  
Empowering you to train smarter, stay motivated every single day, and crush your fitness and health goals faster than you ever imagined. With AI-guided workouts, personalized nutrition plans, and real-time performance insights, achieving your best self has never been easier or more fun!


## Quick Scoop
• 🎯 AI-powered apps are helping people reach fitness goals faster than ever.
• 📌 Personalized training and nutrition plans are now accessible to everyone.

## Document Snapshot
• 📄 Type: Health & Fitness Insights
• 👥 Audience: Fitness enthusiasts, health professionals, tech lovers

## Key Highlights
• 🚀 AI analyzes user habits to create custom workouts and meal plans
• ⭐ Smart wearables track performance and provide real-time coaching
• 💫 Virtual trainers powered by AI motivate and correct form automatically

## Why This Matters
• 💡 Personalized guidance improves results and reduces injury risk
• 🌐 AI makes expert-level fitness accessible to people anywhere
• 🏆 Data-driven insights help users optimize their health and performance

## Main Takeaways
• 🎯 Insight: AI can now tailor workouts and nutrition for individual needs
• 💪 Advantage: Consistency, efficiency, and science-backed recommendations
• 🔥 Impact: Fitness apps and gyms are integrating AI to boost client success

## Pro Tips
• ⭐ Tip 1: Use AI tools to track progress and adapt workouts dynamically
• 💎 Tip 2: Combine AI insights with professional guidance for maximum results
• 🌟 Tip 3: Leverage wearables to get actionable data and stay accountable

## Key Terms
• 📚 AI Fitness Coaching: Using AI algorithms to design training routines
• 🔍 Wearables & Trackers: Devices that collect health data and provide insights

## Bottom Line
• 💫 AI isn’t replacing trainers—it’s making fitness smarter, safer, and more effective. Stay active, stay motivated, and let AI guide your journey to better health!
`;


export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5
        -translate-x-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%,74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 background-blur-xs border border-gray-500/20 mb-4">
            <FileText className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              See how SummizeDoc turns complex PDFs{" "}
              <span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent ">
               into clear, bite-sized insights
              </span>{" "}
              in seconds!
            </MotionH3>
          </div>
        </div>

        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          {/* Summary Viewer */}
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryViewer summary={DEMO_SUMMARY} />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
