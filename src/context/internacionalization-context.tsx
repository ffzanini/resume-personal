"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

import { LanguageLoader } from "@/components";
import { en, es, pt } from "../locales";

export interface InternacionalizationInterface {
  location: "en" | "es" | "pt";
  setLocation: (location: "en" | "es" | "pt") => void;
  translations: typeof pt;
}

const InternacionalizationContext = createContext(
  {} as InternacionalizationInterface
);

const useTranslation = () => {
  const context = useContext(InternacionalizationContext);

  if (context === undefined) {
    throw new Error(
      "useTranslation must be used within InternacionalizationProvider"
    );
  }

  return context;
};

const STORAGE_KEY = "language";

type Locations = "en" | "es" | "pt";

function isValidLocation(value: string | null): value is Locations {
  return value === "pt" || value === "en" || value === "es";
}

function getLanguageFromNavigator(): Locations {
  if (typeof navigator === "undefined" || !navigator.language) return "en";
  const browserLang = navigator.language.split("-")[0]?.toLowerCase();

  if (browserLang === "pt") return "pt";
  if (browserLang === "es") return "es";
  if (browserLang === "en") return "en";
  return "en";
}

function getInitialLanguage(): Locations {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (isValidLocation(stored)) return stored;

  return getLanguageFromNavigator();
}

const InternacionalizationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [location, setLocationState] = useState<Locations | null>(null);

  const setLocation = useCallback((newLang: Locations) => {
    setLocationState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLang);
    }
  }, []);

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLocationState(initialLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, initialLang);
    }
  }, []);

  useEffect(() => {
    if (location) {
      document.body.setAttribute("data-language-ready", "true");
      document.documentElement.lang = location;
    }
  }, [location]);

  const objTranslations = useMemo(() => {
    const currentLocation = location ?? "en";

    return {
      location: currentLocation,
      setLocation,
      translations:
        currentLocation === "en"
          ? en
          : currentLocation === "es"
            ? es
            : pt,
    };
  }, [location, setLocation]);

  if (location === null) return <LanguageLoader />;

  return (
    <InternacionalizationContext.Provider value={objTranslations}>
      {children}
    </InternacionalizationContext.Provider>
  );
};

export { InternacionalizationProvider, useTranslation };
