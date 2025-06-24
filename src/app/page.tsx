"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import { useLayoutEffect, useState } from "react";

import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { LuMail, LuCopy, LuSun, LuMoonStar } from "react-icons/lu";

import { useTranslation } from "@/context";
import {
  LanguageSelect,
  ResumeDownloadButton,
  RichTextViewer,
} from "@/components";
import { socialsResume } from "@/constants/socials";
import { fontRyanaLovely } from "./fonts";
import { cn } from "@/libs/cn";

export default function Resume() {
  const { translations, setLocation, location } = useTranslation();
  const { theme, setTheme } = useTheme();

  const [checkTheme, setCheckTheme] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const text = translations.resume.about.description;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(translations.resume.toast);
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
          url: `${window.location.origin}${window.location.pathname}?lang=${location}`,
          language: location,
          theme: theme,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume-${location}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    if (theme) {
      setCheckTheme(theme);
    }
  }, [theme]);

  return (
    <main className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col page-break-before:always">
        <div className="relative flex flex-row justify-between space-y-4 no-print">
          <div className="flex items-center">
            <span
              className={cn(
                `${fontRyanaLovely.className} opacity-100 transition-opacity duration-200 text-3xl`
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

        <div className="flex flex-row space-x-4 lg:space-x-8 items-center">
          <Image
            src="/images/me_home.jpeg"
            alt="Profile photo"
            width={145}
            height={145}
            className="rounded-full border border-gray-900 dark:border-gray-50"
          />
          <div className="flex flex-col w-full">
            <div className="grid grid-row-2 md:flex md:flex-row md:items-center gap-2 justify-between">
              <h1 className="text-lg md:text-2xl font-bold order-2 md:order-1">
                {translations.resume.name}
              </h1>
            </div>
            <span className="text-base md:text-lg mb-2">
              {translations.resume.description}
            </span>
            <button
              onClick={handleGeneratePDF}
              disabled={loading}
              className="no-print cursor-pointer"
            >
              <div className="flex flex-row gap-2 items-center font-semibold opacity-100 hover:opacity-80"></div>
            </button>
            <Link
              href="https://www.ffzanini.dev/"
              className="w-32 flex flex-row justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold py-1 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
            >
              ffzanini.dev
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-6 gap-2 my-4">
          <motion.a href="mailto:devffzanini@gmail.com" target="_blank">
            <div className="flex flex-row gap-2 items-center font-semibold opacity-100 hover:opacity-80">
              <LuMail className="h-4 w-4" />
              <p>{translations.resume.icos.mail}</p>
            </div>
          </motion.a>
          {location === "pt" && <ResumeDownloadButton language={location} />}

          <button onClick={copyToClipboard} className="no-print cursor-pointer">
            <div className="flex flex-row gap-2 items-center font-semibold opacity-100 hover:opacity-80">
              <LuCopy className="icon-body" />
              <p>{translations.resume.icos.bio}</p>
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.about.title}
          </h1>
          <span className="text-base md:text-lg mb-2">{text}</span>
        </div>

        <div className="flex flex-col gap-2 my-4">
          {socialsResume.map(({ href, icon: Icon, name, label }) => (
            <div key={name} className="flex flex-row gap-2 items-center">
              <Icon className="h-5 w-5" />
              <span className="text-base">{name} - </span>
              <motion.a
                className="text-base font-semibold"
                href={href}
                target="_blank"
              >
                {label}
              </motion.a>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.experience.title}
          </h1>
          {translations.resume.experience.information.map((exp) => (
            <div
              key={exp.id}
              className="flex flex-col md:flex-row pt-4 md:pt-8 gap-4 print:page-break"
            >
              <div className="flex flex-row min-w-0 md:min-w-[220px]">
                <span className="text-lg font-semibold">
                  {exp.initial_date} — {exp.final_date}
                </span>
              </div>
              <div className="flex flex-col">
                <motion.a
                  href={exp.link}
                  className="text-lg md:text-xl font-semibold hover:underline"
                  target="_blank"
                >
                  {exp.title}
                </motion.a>
                <RichTextViewer content={exp.description} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.education.title}
          </h1>
          {translations.resume.education.information.map((edu) => (
            <div
              key={edu.id}
              className="flex flex-col md:flex-row pt-4 md:pt-8 gap-4 print:page-break"
            >
              <div className="flex flex-row min-w-0 md:min-w-[220px]">
                <span className="text-lg font-semibold">
                  {edu.initial_date} — {edu.final_date}
                </span>
              </div>
              <div className="flex flex-col">
                <motion.a
                  href={edu.link}
                  className="text-lg md:text-xl font-semibold hover:underline"
                  target="_blank"
                >
                  {edu.title}
                </motion.a>
                <span className="text-base md:text-lg">{edu.region}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.certifications.title}
          </h1>
          {translations.resume.certifications.information.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col md:flex-row pt-4 md:pt-8 gap-4 print:page-break"
            >
              <div className="flex flex-row min-w-0 md:min-w-[220px]">
                <span className="text-lg font-semibold">
                  {cert.initial_date} — {cert.final_date}
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold">{cert.title}</h1>
                <span className="text-base md:text-lg">{cert.region}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.skills.title}
          </h1>
          {translations.resume.skills.information.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col pt-4 gap-2 print:page-break"
            >
              <h1 className="text-lg md:text-xl font-bold">{skill.title}</h1>
              <span className="text-base md:text-lg">{skill.desciption}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.language.title}
          </h1>
          {translations.resume.language.information.map((lang) => (
            <div
              key={lang.id}
              className="flex flex-col pt-4 gap-2 print:page-break"
            >
              <h1 className="text-lg md:text-xl font-bold">{lang.title}</h1>
              <span className="text-base md:text-lg">{lang.desciption}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
