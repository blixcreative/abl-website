"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children, className = "", variant = "primary" }: { children: React.ReactNode, className?: string, variant?: "primary" | "danger" }) {
  const { pending } = useFormStatus();
  
  const baseClasses = "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-colors inline-flex items-center justify-center";
  const primaryClasses = "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
  const dangerClasses = "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500";
  
  const classes = `${baseClasses} ${variant === "primary" ? primaryClasses : dangerClasses} ${className}`;

  return (
    <button type="submit" disabled={pending} className={classes}>
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Đang xử lý...
        </>
      ) : (
        children
      )}
    </button>
  );
}