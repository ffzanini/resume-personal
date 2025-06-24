"use client";
import { useEffect } from "react";

import { useTranslation } from "@/context";
import { getBrowserLanguage } from "@/libs/browser";

export function SetInitialLanguage() {
  const { setLocation } = useTranslation();

  useEffect(() => {
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
