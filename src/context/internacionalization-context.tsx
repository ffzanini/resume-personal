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

import { en, es, pt } from "../locales";

type Locations = "en" | "es" | "pt";

export interface InternacionalizationInterface {
  location: Locations;
  setLocation: (location: Locations) => void;
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

const getInitialLanguage = (): Locations => {
  if (typeof window === "undefined") return "en";

  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("lang");

  if (lang === "pt" || lang === "en" || lang === "es") return lang as Locations;

  const browserLang = navigator.language?.split("-")[0];
  if (browserLang === "pt" || browserLang === "en" || browserLang === "es") {
    return browserLang as Locations;
  }

  return "en";
};

const InternacionalizationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [location, setLocation] = useState<Locations | null>(null);

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLocation(initialLang);
  }, []);

  useEffect(() => {
    if (location) {
      document.body.setAttribute("data-language-ready", "true");
    }
  }, [location]);

  const getTranslations = useCallback(() => {
    if (location === "en") return en;
    if (location === "es") return es;
    return pt;
  }, [location]);

  const objTranslations = useMemo(() => {
    return {
      location: location || "pt",
      setLocation,
      translations: getTranslations(),
    };
  }, [location, getTranslations]);

  if (location === null) return null;

  return (
    <InternacionalizationContext.Provider value={objTranslations}>
      {children}
    </InternacionalizationContext.Provider>
  );
};

export { InternacionalizationProvider, useTranslation };
