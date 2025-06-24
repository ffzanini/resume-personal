"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { LuDownload } from "react-icons/lu";

interface ResumeDownloadButtonProps {
  language: "pt" | "en" | "es";
}

export function ResumeDownloadButton({ language }: ResumeDownloadButtonProps) {
  const { theme } = useTheme();
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (!language || !theme) return;

    const selectedTheme = theme === "dark" ? "dark" : "white";
    const fileName = `resume-${language}-${selectedTheme}.pdf`;
    setFileUrl(`/${fileName}`);
  }, [language, theme]);

  return (
    <a href={fileUrl} download className="no-print cursor-pointer">
      <div className="flex flex-row gap-2 items-center font-semibold opacity-100 hover:opacity-80">
        <LuDownload className="icon-body" />
        <p>Dowload</p>
      </div>
    </a>
  );
}
