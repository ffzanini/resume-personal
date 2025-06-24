"use client";
import {
  useState,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
  ReactElement,
} from "react";
import { LuArrowDown } from "react-icons/lu";
import {
  US as USFlag,
  BR as BRFlag,
  ES as ESFlag,
} from "country-flag-icons/react/3x2";

import { cn } from "@/libs/cn";

type Locations = "pt" | "en" | "es";

const languages: { code: Locations; label: string; flag: ReactElement }[] = [
  { code: "pt", label: "PT", flag: <BRFlag className="w-5 h-auto" /> },
  { code: "en", label: "EN", flag: <USFlag className="w-5 h-auto" /> },
  { code: "es", label: "ES", flag: <ESFlag className="w-5 h-auto" /> },
];

interface LanguageSelectProps {
  selected: string;
  onChange: (code: Locations) => void;
  setIsOpenMenu?: Dispatch<SetStateAction<boolean>>;
}

export function LanguageSelect({
  selected,
  onChange,
  setIsOpenMenu,
}: LanguageSelectProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedLang =
    languages.find((l) => l.code === selected) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={selectRef}
      className="relative inline-block w-24 text-sm font-semibold"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 px-3 py-2 rounded-lg hover:outline-none hover:ring-1 hover:ring-primary-800 dark:hover:ring-primary-300"
      >
        <span className="flex items-center gap-2">
          <span>{selectedLang.flag}</span>
          <span>{selectedLang.label}</span>
        </span>
        <LuArrowDown
          className={cn(
            `ml-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`
          )}
        />
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-gray-100 dark:bg-dark-theme xl:bg-black/5 xl:dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg shadow-lg">
          {languages.map((lang, index) => (
            <li
              key={lang.code}
              onClick={() => {
                onChange(lang.code);
                setOpen(false);
                if (setIsOpenMenu) setIsOpenMenu(false);
              }}
              className={cn(`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-black/15 dark:hover:bg-white/15
                            ${
                              selected === lang.code
                                ? "bg-black/15 dark:bg-white/15"
                                : ""
                            }
                            ${index === 0 ? "rounded-t-lg" : ""}
                            ${
                              index === languages.length - 1
                                ? "rounded-b-lg"
                                : ""
                            }
                          `)}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
