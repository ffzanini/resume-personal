"use client";
import { useEffect } from "react";

import { useTranslation } from "@/context";
import { getBrowserLanguage } from "@/libs/browser";

export function SetInitialLanguage() {
  const { setLocation } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get("lang");
    if (langFromUrl === "pt" || langFromUrl === "en" || langFromUrl === "es") {
      setLocation(langFromUrl);
      return;
    }

    const initialLanguage = getBrowserLanguage();
    switch (initialLanguage) {
      case "pt":
      case "en":
      case "es":
        setLocation(initialLanguage);
        break;
      default:
        setLocation("pt");
    }
  }, [setLocation]);

  return null;
}
