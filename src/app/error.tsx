"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-malta-dark">Something went wrong</h1>
        <p className="mt-4 text-foreground/50">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-malta-blue px-6 py-2 text-white transition-colors hover:bg-malta-blue/80"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
