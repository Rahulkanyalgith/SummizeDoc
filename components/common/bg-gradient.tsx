import { cn } from "@/lib/utils";

export default function BgGradient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
    >
      <div
        style={{
          clipPath:
            "polygon(44% 0, 60% 8%, 88% 16%, 100% 44%, 92% 70%, 76% 86%, 50% 100%, 26% 86%, 10% 70%, 2% 44%, 14% 16%, 36% 8%)",
        }}
        className={cn(
          "relative left-[calc(50%-8rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-6 bg-linear-to-br from-indigo-400 via-rose-300 to-amber-200 opacity-30 sm:left-[calc(50%-24rem)] sm:w-5xl",
          className,
        )}
      />
    </div>
  );
}
