"use client";

export default function Error({ retry }: { error: Error; retry: () => void }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-3 text-muted">
        An unexpected error occurred. Please try again or contact support if
        the problem persists.
      </p>
      <button
        type="button"
        onClick={retry}
        className="mt-6 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
      >
        Try Again
      </button>
    </div>
  );
}
