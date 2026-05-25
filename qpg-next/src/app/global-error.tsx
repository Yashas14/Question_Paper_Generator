"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-4 p-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Something went wrong
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            An unexpected error occurred. Please try again.
          </p>
          <Button onClick={reset} variant="default">
            Try Again
          </Button>
        </div>
      </body>
    </html>
  );
}
