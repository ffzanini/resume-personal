"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { LuMail, LuCopy, LuDownload } from "react-icons/lu";

type ResumeActionsProps = {
  language: "en" | "es" | "pt";
  aboutText: string;
  labels: {
    mail: string;
    bio: string;
    pdf_click: string;
    pdf_loading: string;
    pdf_success: string;
  };
  copySuccessText: string;
};

export function ResumeActions({
  language,
  aboutText,
  labels,
  copySuccessText,
}: Readonly<ResumeActionsProps>) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(aboutText)
      .then(() => {
        toast.success(copySuccessText);
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  const handleGeneratePDF = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `${window.location.origin}${window.location.pathname}`,
          language,
          theme: theme === "dark" ? "dark" : "light",
        }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to generate PDF";
        try {
          const data = await response.json();
          if (data?.message) errorMessage = data.message;
        } catch {
          // Ignore non-JSON errors
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const fileUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = `resume-${language}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(fileUrl);
      toast.success(labels.pdf_success);
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Failed to generate PDF";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-6 gap-2 my-4">
      <a href="mailto:devffzanini@gmail.com" target="_blank">
        <div className="flex flex-row gap-2 items-center font-semibold opacity-100 hover:opacity-80">
          <LuMail className="h-4 w-4" />
          <p>{labels.mail}</p>
        </div>
      </a>

      <button
        onClick={handleGeneratePDF}
        disabled={loading}
        className="no-print cursor-pointer"
      >
        <div className="flex flex-row gap-2 items-center font-semibold opacity-100 hover:opacity-80">
          <LuDownload className="h-4 w-4" />
          <p>{loading ? labels.pdf_loading : labels.pdf_click}</p>
        </div>
      </button>

      <button onClick={copyToClipboard} className="no-print cursor-pointer">
        <div className="flex flex-row gap-2 items-center font-semibold opacity-100 hover:opacity-80">
          <LuCopy className="icon-body" />
          <p>{labels.bio}</p>
        </div>
      </button>
    </div>
  );
}
