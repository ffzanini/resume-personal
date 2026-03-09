"use client";

import { useTheme } from "next-themes";
import { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuSun, LuMoonStar } from "react-icons/lu";

import { useTranslation } from "@/context";
import { LanguageSelect } from "@/components/LanguageSelect";
import { fontRyanaLovely } from "@/app/fonts";
import { cn } from "@/libs/cn";

export function ResumeNavbar() {
  const { setLocation, location } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [checkTheme, setCheckTheme] = useState<string | undefined>();

  useLayoutEffect(() => {
    if (theme) setCheckTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative flex flex-row justify-between space-y-4 no-print">
      <div className="flex items-center">
        <span
          className={cn(
            `${fontRyanaLovely.className} opacity-100 transition-opacity duration-200 text-3xl`,
          )}
        >
          2fZ
        </span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <LanguageSelect selected={location} onChange={setLocation} />
        </div>
        <motion.button onClick={toggleTheme} className="cursor-pointer">
          {checkTheme === "dark" ? (
            <LuSun className="h-5 w-5 hover:rotate-12 transition-transform" />
          ) : (
            <LuMoonStar className="h-5 w-5 hover:rotate-12 transition-transform" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
